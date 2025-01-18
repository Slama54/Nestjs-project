/* eslint-disable prettier/prettier */
import { IsInt, IsPositive, IsString, Length } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreatePropertyDto{
    @IsString()
    
    name :string;


    @IsString()
    @Length(2,10,{groups:['create']})
    @Length(1,15,{groups:['update']})

    description: string;



    @IsInt()
    @IsPositive()
    price: number;
}