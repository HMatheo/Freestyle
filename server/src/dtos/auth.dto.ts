import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterDto {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
    public username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    public password: string;
}

export class LoginDto {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    public password: string;
}