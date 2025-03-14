/* eslint-disable prettier/prettier */
import {  Faker } from "@faker-js/faker";
import { User } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const UserFactory = setSeederFactory(User, (faker : Faker)=>{
    const user = new User();
    user.firstName =faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.avatarURl = faker.image.avatar();
   // user.password = faker.internet.password();
    return user;
})