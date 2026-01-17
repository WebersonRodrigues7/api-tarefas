import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UsersDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}