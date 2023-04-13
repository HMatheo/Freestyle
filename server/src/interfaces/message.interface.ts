import {Message, User} from "@/entities";
import {IDefaultResponse} from "@/interfaces/index";

export interface ISendMessageInput {
    user: User;
    content: string;
}

export interface IGetMessagesResponse extends IDefaultResponse {
    messages?: Message[];
    nbMessages: number;
}