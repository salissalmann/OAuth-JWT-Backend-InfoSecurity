import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/http/HttpExceptions';
import { JWT } from '@/config';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '@/db/models/users.model';
import { IUser } from '@/interfaces/users.interface';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

const ValidateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("ValidateAccessToken");
        console.log(req.header("Authorization-Token"));
        const AccessToken = req.header("Authorization-Token");
        if (!AccessToken) throw new HttpException(401, "Access Token not found");

        const Payload = jwt.verify(AccessToken, JWT.ACCESS_SECRET,
            (error: any, decoded: { _id: string, iat: number, exp: number }) => {
                if (error) throw new HttpException(401, "Invalid Access Token");
                return decoded;
            });

        const User = await UserModel.findById(Payload._id)
        if (!User) throw new HttpException(401, "Invalid Access Token");
        req.user = User;
        next();
    }
    catch (error) {
        next(error);
    }
};

export default ValidateAccessToken







