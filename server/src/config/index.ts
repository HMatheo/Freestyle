import * as process from "process";

export const {DB_HOST, DB_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD} = process.env;
export const {JWT_SECRET} = process.env;
export const {COOKIE_SECRET} = process.env;