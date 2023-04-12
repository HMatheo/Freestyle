import {User} from "@/entity";
import {DataStoredInToken} from "@/interfaces";
import {sign} from "jsonwebtoken";
import {JWT_SECRET} from "@/config";

export class AuthService {
    private createToken(user: User): string {
        const dataStoredInToken: DataStoredInToken = {
            id: user.id,
            email: user.email
        };
        return sign(dataStoredInToken, JWT_SECRET, {expiresIn: '7d'});
    }
}