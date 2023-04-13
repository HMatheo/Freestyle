import {AuthenticateRequest, IDataStoredInToken} from "@/interfaces";
import {NextFunction, Response} from "express";
import {verify} from "jsonwebtoken";
import {JWT_SECRET} from "@/config";
import {DI} from "@/app";
import {User} from "@/entities";

export async function AuthMiddleware(req: AuthenticateRequest, res: Response, next: NextFunction) {
    try {
        const token: string = req.cookies.token;
        if (token) {
            const dataStoredInToken = verify(token, JWT_SECRET) as IDataStoredInToken;
            const user: User = await DI.userRepository.findOne({
                id: dataStoredInToken.id
            });

            if (user) {
                req.user = user;
                next();
            } else {
                next(new Error("BAD_TOKEN_DATA"));
            }
        } else {
            next(new Error("BAD_TOKEN"));
        }
    } catch(e: any) {
        next(new Error(e.message));
    }
}