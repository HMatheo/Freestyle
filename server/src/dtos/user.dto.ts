import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    public oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    public newPassword: string;
}

export class ChangeUsernameDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
    public newUsername: string;
}