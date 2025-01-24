/* eslint-disable prettier/prettier */

import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    avatarURl?: string;
    @IsString()
    password: string;
}
