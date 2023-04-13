import {AuthService} from "@/services";
import {NextFunction, Request, Response} from "express";
import {ILoginInput, ILoginResponse, IRegisterInput} from "@/interfaces";
import {Container} from "typedi";

export class AuthController {
    public authService = Container.get(AuthService);

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const registerInput = req.body as IRegisterInput;
            const registerResponse: ILoginResponse = await this.authService.register(registerInput);

            if (!registerResponse.success) return res.status(400).json(registerResponse);
            else {
                req.session.userId = registerResponse.user.id;
                return res.cookie("token", registerResponse.token).status(201).json({
                    success: true
                });
            }
        } catch(e: any) {
            next(e);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loginInput: ILoginInput = req.body;
            const loginResponse: ILoginResponse = await this.authService.login(loginInput);

            if (!loginResponse.success) return res.status(400).json(loginResponse);
            else {
                req.session.userId = loginResponse.user.id;
                return res.cookie('token', loginResponse.token).status(201).json({
                    success: true
                });
            }
        } catch(e: any) {
            next(e);
        }
    }
}