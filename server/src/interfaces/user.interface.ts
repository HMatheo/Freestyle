import {User} from "@/entities";

export interface IChangePasswordInput {
    user: User;
    oldPassword: string;
    newPassword: string;
}

export interface IChangeUsernameInput {
    user: User;
    newUsername: string;
}