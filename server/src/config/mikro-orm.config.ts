import {defineConfig} from "@mikro-orm/postgresql";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME} from "@/config";
import {User} from "@/entities";
export default defineConfig({
    clientUrl: `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    type: "postgresql",
    tsNode: true,
    debug: true, // à changer
    forceUtcTimezone: true,
    entities: [
        User,
    ],
    allowGlobalContext: true
});