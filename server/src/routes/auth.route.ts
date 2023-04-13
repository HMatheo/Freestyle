import {IRoutes} from "@/interfaces";
import {Router} from "express";
import {AuthController} from "@/controllers";
import {ValidationMiddleware} from "@/middlewares";
import {LoginDto, RegisterDto} from "@/dtos";

export class AuthRoute implements IRoutes{
    private path: string = "/";
    public router: Router = new Router();
    public authController = new AuthController();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}register`, ValidationMiddleware(RegisterDto), this.authController.register);
        this.router.post(`${this.path}login`, ValidationMiddleware(LoginDto), this.authController.login);
    }
}