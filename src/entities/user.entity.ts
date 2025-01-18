/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,ManyToMany, JoinTable} from "typeorm"
import { Property } from "./property.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    email: string;
    @Column()
    avatarURl: string;
    @CreateDateColumn()
    createdAt: Date;
    @OneToMany(()=>Property,(property)=>property.user)
    properties:Property[];
    @ManyToMany(()=>Property,(property)=>property.likedBy)
    @JoinTable({name:'User_liked_properties',})
    likedProperties:Property[]

}