import {Service} from "typedi";
import {IChangePasswordInput, IDefaultResponse} from "@/interfaces";
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
}