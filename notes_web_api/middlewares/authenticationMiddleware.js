import tokenService from "../services/tokenService.js";
import { User } from "../models/User.js";
import { AuthenticationError } from "../errors/CustomErrors.js";

export default function authenticationMiddleware(req, res, next)  {
      try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = tokenService.verifyAccessToken(token);

            User.checkId(decodedToken.id);
            User.checkEmail(decodedToken.email);

            res.locals.id = decodedToken.id;
            res.locals.email = decodedToken.email;

            next();
      } 
      catch (error) {
            next(new AuthenticationError('Incorrect access token'));
      };
}