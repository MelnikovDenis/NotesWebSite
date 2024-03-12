import bcrypt from 'bcrypt';
import userRepository from '../persistence/reposotories/userRepository.js';
import { NotFoundError, AuthenticationError } from '../errors/CustomErrors.js';
import { User } from '../models/User.js'

class UserController {
    constructor() {

    }

    async aboutme(req, res, next) {
        try {
            const email = res.locals.email;

            const user = await userRepository.readUser(email);

            if(!user)
                throw new NotFoundError('User was not found');

            res.status(200).json({id: user.id, email: user.email, nickname: user.nickname});
        }
        catch(error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = res.locals.id;
            const oldEmail = res.locals.email;
            const { new_password: newPassword, old_password: oldPassword, new_nickname: newNickname, new_email: newEmail } = req.body;

            User.checkPassword(newPassword);
            User.checkPassword(oldPassword);
            User.checkEmail(newEmail);
            User.checkNickname(newNickname);

            const user = await userRepository.readUser(oldEmail);

            if(!user)
                throw new NotFoundError('User was not found');

            if(!await bcrypt.compare(oldPassword, user.passwordHash))
                throw new AuthenticationError('Incorrect password');

            await userRepository.updateUser(id, newEmail, newPassword, newNickname);

            res.status(200).send();
        }
        catch(error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const id = res.locals.id;
            const email = res.locals.email;
            const { password } = req.body;
           
            User.checkPassword(password);

            const user = await userRepository.readUser(email);

            if(!user)
                throw new NotFoundError('User was not found');

            if(!await bcrypt.compare(password, user.passwordHash))
                throw new AuthenticationError('Incorrect password');
            
            await userRepository.deleteUser(id);

            res.clearCookie('refreshToken');
            
            res.status(200).send();
        }
        catch(error) {
            next(error);
        }
    }
    
}

const userController = new UserController();
export default userController;