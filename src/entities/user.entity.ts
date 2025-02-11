/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,ManyToMany, JoinTable, BeforeInsert} from "typeorm"
import { Property } from "./property.entity";
import * as bcrypt from 'bcrypt'

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
    @Column({ nullable: true })
    avatarURl: string;
    @CreateDateColumn()
    createdAt: Date;
    @Column()
    password: string;
    @Column({ nullable: true})
    hashedRefreshToken:string;

    @OneToMany(()=>Property,(property)=>property.user)
    properties:Property[];
    @ManyToMany(()=>Property,(property)=>property.likedBy)
    @JoinTable({name:'User_liked_properties',})
    likedProperties:Property[]

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10)
    }
    

}