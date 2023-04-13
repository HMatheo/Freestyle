import {User} from "@/entities";

export interface IChangePasswordInput {
    user: User;
    oldPassword: string;
    newPassword: string;
}