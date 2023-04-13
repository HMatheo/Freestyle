import {IDefaultResponse} from "@/interfaces";
import {User} from "@/entities";
import {Request} from "express";

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

export interface AuthenticateRequest extends Request {
    user: User;
}