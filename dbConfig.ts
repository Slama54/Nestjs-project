/* eslint-disable prettier/prettier */

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig : PostgresConnectionOptions ={
    url: "postgresql://realEstateDB_owner:2J6znluSEfqU@ep-still-bird-a8kemje3.eastus2.azure.neon.tech/realEstateDB?sslmode=require",
    type:"postgres",
    port:3306,
    entities:[__dirname+'/**/*.entity{.ts,.js}'],
    synchronize:true,
}