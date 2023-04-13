import {Container} from "typedi";
import {MessageService} from "@/services/message.service";
import {AuthenticateRequest, IDefaultResponse, IGetMessagesResponse, ISendMessageInput} from "@/interfaces";
import {Response} from "express";
import {User} from "@/entities";

export class MessageController {
    public messageService = Container.get(MessageService);

    public sendMessage = async(req: AuthenticateRequest, res: Response) => {
        try {
            const user: User = req.user;
            const sendMessageInput = {...req.body, user} as ISendMessageInput;
            const sendMessageResponse: IDefaultResponse = await this.messageService.sendMessage(sendMessageInput);

            return res.status(sendMessageResponse.success ? 201 : 400).json(sendMessageResponse);
        } catch (e: any) {
            return res.status(400).json({
                success: false,
                message: e.message
            });
        }
    }

    public getMessages = async(req: AuthenticateRequest, res: Response) => {
        try {
            const getMessagesResponse: IGetMessagesResponse = await this.messageService.getMessages();

            res.status(getMessagesResponse.success ? 201 : 400).json(getMessagesResponse);
        } catch(e: any) {
            return res.status(400).json({
                success: false,
                message: e.message
            }) as IGetMessagesResponse;
        }
    }
}