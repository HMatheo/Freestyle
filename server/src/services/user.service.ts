import {Service} from "typedi";
import {IChangePasswordInput, IChangeUsernameInput, IDefaultResponse} from "@/interfaces";
import {DI} from "@/app";

@Service()
export class UserService {
    public async changePassword(input: IChangePasswordInput): Promise<IDefaultResponse> {
        if (input.oldPassword != input.user.password) return {
            success: false,
            message: "WRONG_OLD_PASSWORD"
        } as IDefaultResponse;

        if (input.oldPassword == input.newPassword) return {
            success: false,
            message: "SAME_PASSWORDS"
        } as IDefaultResponse;
        try {
            input.user.password = input.newPassword;
            await DI.userRepository.persistAndFlush(input.user);
            return {
                success: true
            } as IDefaultResponse;
        } catch(e: any) {
            return {
                success: false,
                message: e.message
            } as IDefaultResponse;
        }
    }

    public async changeUsername(input: IChangeUsernameInput): Promise<IDefaultResponse> {
        if (input.user.username == input.newUsername) return {
            success: false,
            message: "SAME_USERNAMES"
        } as IDefaultResponse;

        const expr = (sql: string) => sql;
        const findUser = await DI.userRepository.findOne({
            [expr("upper(username)")]: [input.newUsername.toUpperCase()]
        });
        if (findUser) return {
            success: false,
            message: "USERNAME_ALREADY_EXISTS"
        } as IDefaultResponse;

        try {
            input.user.username = input.newUsername;
            await DI.userRepository.persistAndFlush(input.user);
            return {
                success: true
            } as IDefaultResponse;
        } catch(e: any) {
            return {
                success: false,
                message: e.message
            } as IDefaultResponse;
        }
    }
}