/* eslint-disable prettier/prettier */
import { IsInt, IsPositive } from "class-validator";

export class IdPramDto {
    @IsInt()
    @IsPositive()
    id: number;
}