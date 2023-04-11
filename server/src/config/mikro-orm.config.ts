import {defineConfig} from "@mikro-orm/postgresql";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME} from "./index";

export default defineConfig({
    clientUrl: `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    tsNode: true,
    debug: true, // à changer
    forceUtcTimezone: true,
    entities: []
});