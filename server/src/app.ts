import 'reflect-metadata';
import express from "express";
import session from "express-session";
import mikroOrmConf from "@/config/mikro-orm.config";
import {EntityManager, EntityRepository, MikroORM, RequestContext} from "@mikro-orm/core";
import {User} from "@/entities";
import {COOKIE_SECRET} from "@/config";
import {ApiRoutes} from "@/routes";

declare module "express-session" {
    interface SessionData {
        userId: string;
    }
}
export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>
};

class App {
    public app: express.Application;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080; // add to environment variables

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private async connectToDatabase(): Promise<void> {
        try {
            DI.orm = await MikroORM.init(mikroOrmConf);
            DI.em = DI.orm.em;
            DI.userRepository = DI.orm.em.getRepository(User);
            await DI.orm.getSchemaGenerator().updateSchema();
        } catch(e: any) {
            console.log(e.message);
        }
        this.app.use((_1, _2, next) => RequestContext.create(DI.orm.em, next));
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(session({
            name: 'q_user',
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                httpOnly: true,
                sameSite: 'lax'
            },
            saveUninitialized: false,
            secret: COOKIE_SECRET
        }));
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("=================================");
            console.log(`======= ENV: ${process.env.NODE_ENV || 'development'} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log("=================================");
        });
    }

    private initializeRoutes(): void {
        this.app.use('/', new ApiRoutes().router);
    }
}

export default App;