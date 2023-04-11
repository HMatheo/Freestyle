import express from "express";

class App {
    public app: express.Application;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080; // add to environment variables

        this.initializeMiddlewares();
        this.initializeRoutes();
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