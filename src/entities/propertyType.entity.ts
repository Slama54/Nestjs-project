/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PropertyType{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    value: string
}