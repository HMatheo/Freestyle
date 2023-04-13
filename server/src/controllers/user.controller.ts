import {Container} from "typedi";
import {UserService} from "@/services";
import {AuthenticateRequest, IChangePasswordInput, IDefaultResponse} from "@/interfaces";
import {Response} from "express";
import {User} from "@/entities";

export class UserController {
    public userService = Container.get(UserService);

    public changePassword = async(req: AuthenticateRequest, res: Response) => {
        try {
            const user: User = req.user;
            const changePasswordInput = {...req.body, user} as IChangePasswordInput;
            const changePasswordResponse: IDefaultResponse = await this.userService.changePassword(changePasswordInput);

            res.status(changePasswordResponse.success ? 201 : 400).json(changePasswordResponse);

        } catch (e: any) {
            res.status(400).json({
                success: false,
                message: e.message
            });
        }
    }
}