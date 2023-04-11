import express from "express";
import mikroOrmConf from "./config/mikro-orm.config";
import {MikroORM} from "@mikro-orm/core";

class App {
    public app: express.Application;
    public port: string | number;
    private orm: MikroORM;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080; // add to environment variables

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private async connectToDatabase(): Promise<void> {
        try {
            this.orm = await MikroORM.init(mikroOrmConf);
            await this.orm.getSchemaGenerator().updateSchema();
        } catch(e: any) {
            console.log(e.message);
        }
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
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
        this.app.use('/', (req: express.Request, res: express.Response) => {
            return res.status(200).send("Hello world !");
        });
    }
}

export default App;