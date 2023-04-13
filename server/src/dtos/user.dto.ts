import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    newPassword: string;
}