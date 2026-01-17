import {drizzle} from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"
import { ENV } from "../config/env"

if(!ENV.DATABASE_URL){
    throw new Error("Database url is not set in environment variables")
}


//Initialize connection pool
const pool = new Pool({
    connectionString : ENV.DATABASE_URL,
})

//log when first connection is made
pool.on("connect", () => {
    console.log("Connected to the database")
})

//log when some kind of error occurs
pool.on("error", (err) => {
    console.error("Database connection error:", err);
})

export const db = drizzle({client : pool, schema})