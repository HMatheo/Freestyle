import {IRoutes} from "@/interfaces";
import {Router} from "express";
import {AuthRoute} from "@/routes/auth.route";
import {UserRoute} from "@/routes/user.route";
import {MessageRoute} from "@/routes/message.route";

export class ApiRoutes implements IRoutes {
    private path: string = "/api/v1/";
    public router: Router = new Router();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(`${this.path}auth`, (new AuthRoute()).router);
        this.router.use(`${this.path}user`, (new UserRoute()).router);
        this.router.use(`${this.path}messages`, (new MessageRoute()).router);
    }
}

export * from './auth.route';
export * from './message.route';
export * from './user.route';
