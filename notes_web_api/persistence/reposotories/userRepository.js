import bcrypt from 'bcrypt';
import config from 'config';
import { User } from '../../models/User.js';
import { query } from '../db.js';

class UserRepository {
    saltRounds;

    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }
    
    async createUser(email, password, nickname) {
        const passwordHash = await bcrypt.hash(password, this.saltRounds);
        const paramQuery = {
            rowMode: 'array',
            text: 'INSERT INTO note_user(user_email, user_nickname, user_password_hash) VALUES($1, $2, $3) RETURNING *',
            values: [email, nickname, passwordHash]
        };
        const result = await query(paramQuery);
        return new User(result.rows[0][0], 
            result.rows[0][1], 
            result.rows[0][2], 
            result.rows[0][3]);
    }

    async readUser(email) {
        const paramQuery = {
            rowMode: 'array',
            text: 'SELECT user_id, user_email, user_password_hash, user_nickname FROM note_user WHERE user_email = $1',
            values: [email]
        };
        const result = await query(paramQuery);
        if(result.rowCount > 0)
            return new User(result.rows[0][0], 
                result.rows[0][1], 
                result.rows[0][3], 
                result.rows[0][2]);
        else
            return null;
    }

    async updateUser(userId, email, password, nickname) {
        const passwordHash = await bcrypt.hash(password, this.saltRounds);
        const paramQuery = {
            text: 'UPDATE note_user SET user_email = $1, user_nickname = $2, user_password_hash = $3 WHERE user_id = $4',
            values: [email, nickname, passwordHash, userId]
        };
        const result = await query(paramQuery);        
        return result.rowCount;
    }

    async deleteUser(userId) {
        const paramQuery = {
            text: 'DELETE FROM note_user WHERE user_id = $1',
            values: [userId]
        };
        const result = await query(paramQuery);
        return result.rowCount;
    }
}

const userRepository = new UserRepository(config.get('bcrypt.salt_rounds'));
export default userRepository;