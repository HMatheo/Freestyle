import {User} from "@/entities";
import {IDataStoredInToken, ILoginInput, ILoginResponse, IRegisterInput} from "@/interfaces";
import {sign} from "jsonwebtoken";
import {JWT_SECRET} from "@/config";
import {DI} from "@/app";
import {Service} from "typedi";

const createToken = (user: User): string => {
    const dataStoredInToken: IDataStoredInToken = {
        id: user.id,
        email: user.email
    };
    return sign(dataStoredInToken, JWT_SECRET, {expiresIn: '7d'});
}
@Service()
export class AuthService {

    public async login(input: ILoginInput): Promise<ILoginResponse> {
        const findUser: User = await DI.userRepository.findOne({
            email: input.email.toLowerCase()
        });

        if (!findUser) return {
            success: false,
            message: `Impossible de trouver l'adresse ${input.email}`
        } as ILoginResponse;

        if (input.password == findUser.password) {
            findUser.lastLoginAt = Date.now();
            await DI.userRepository.persistAndFlush(findUser);
            return {
                success: true,
                token: createToken(findUser),
                user: findUser
            } as ILoginResponse;
        } else return {
                success: false,
                message: "Les mots de passes ne correspondent pas"
            } as ILoginResponse;
    }

    public async register(input: IRegisterInput): Promise<ILoginResponse> {
        const findUserByEmail: User = await DI.userRepository.findOne({
            email: input.email.toLowerCase()
        });
        if (findUserByEmail) return {
            success: false,
            message: `Un compte existe déjà avec l'adresse ${input.email}`
        } as ILoginResponse;

        const expr = (sql: string) => sql;
        const findUserByUsername = await DI.userRepository.findOne({
            [expr("upper(username)")]: [input.username.toUpperCase()]
        });
        if (findUserByUsername) return {
            success: false,
            message: `Un compte existe déjà avec le pseudonyme ${input.username}`
        } as ILoginResponse;

        try {
            const user: User = DI.userRepository.create({
                email: input.email.toLowerCase(),
                username: input.username,
                password: input.password
            });
            await DI.userRepository.persistAndFlush(user);
            return {
                success: true,
                token: createToken(user),
                user
            } as ILoginResponse;
        } catch (e: any) {
            return {
                success: false,
                message: e.message
            } as ILoginResponse;
        }
    }
}