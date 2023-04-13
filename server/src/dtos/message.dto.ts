import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class SendMessageDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(256)
    public content: string;
}