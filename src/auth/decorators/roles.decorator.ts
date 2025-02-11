/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const Role_KEY = "roles";
export const Roles = (...roles : [Role,...Role[]])=> SetMetadata(Role_KEY, roles)