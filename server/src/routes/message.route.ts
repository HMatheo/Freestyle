import {IRoutes} from "@/interfaces";
import {Router} from "express";
import {AuthMiddleware, ValidationMiddleware} from "@/middlewares";
import {SendMessageDto} from "@/dtos";
import {MessageController} from "@/controllers";

export class MessageRoute implements IRoutes {
    public path: string = "/";
    public router: Router = new Router();
    public messageController: MessageController = new MessageController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}sendMessage`, ValidationMiddleware(SendMessageDto), AuthMiddleware, this.messageController.sendMessage);
        this.router.get(`${this.path}getMessages`, AuthMiddleware, this.messageController.getMessages);
    }
}