import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}

