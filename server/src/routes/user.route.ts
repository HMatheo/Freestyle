import {IRoutes} from "@/interfaces";
import {Router} from "express";
import {UserController} from "@/controllers/user.controller";
import {AuthMiddleware, ValidationMiddleware} from "@/middlewares";
import {ChangePasswordDto, ChangeUsernameDto} from "@/dtos/user.dto";

export class UserRoute implements IRoutes {
    public path = "/";
    public router: Router = new Router();
    public userController: UserController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}changePassword`, ValidationMiddleware(ChangePasswordDto), AuthMiddleware, this.userController.changePassword);
        this.router.post(`${this.path}changeUsername`, ValidationMiddleware(ChangeUsernameDto), AuthMiddleware, this.userController.changeUsername);
    }
}