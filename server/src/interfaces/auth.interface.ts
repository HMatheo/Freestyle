import {IDefaultResponse} from "@/interfaces";
import {User} from "@/entity";

export interface IDataStoredInToken {
    id: string;
    email: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IRegisterInput {
    email: string;
    username: string;
    password: string;
}

export interface ILoginResponse extends IDefaultResponse {
    token?: string;
    user?: User;
}