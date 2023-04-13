import {IGetMessagesResponse, ISendMessageInput} from "@/interfaces/message.interface";
import {IDefaultResponse} from "@/interfaces";
import {DI} from "@/app";
import {Message} from "@/entities";
import {Service} from "typedi";

@Service()
export class MessageService {
    public async sendMessage(input: ISendMessageInput): Promise<IDefaultResponse> {
        try {
            await DI.messageRepository.create({
               author: input.user,
               content: input.content
            });
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

    public async getMessages(): Promise<IGetMessagesResponse> {
        const messages: Message[] = await DI.messageRepository.find({});
        return {
            success: true,
            messages,
            nbMessages: messages.length
        } as IGetMessagesResponse;
    }
}