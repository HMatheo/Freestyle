import 'reflect-metadata';
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import mikroOrmConf from "@/config/mikro-orm.config";
import {EntityManager, EntityRepository, MikroORM, RequestContext} from "@mikro-orm/core";
import {Message, User} from "@/entities";
import {COOKIE_SECRET} from "@/config";
import {ApiRoutes} from "@/routes";
import {createServer, IncomingMessage, Server} from "http";
import { WebSocketServer } from 'ws';
import * as console from "console";
import * as stream from "stream";

declare module "express-session" {
    interface SessionData {
        userId: string;
    }
}

const sessionParser = session({
    name: 'q_user',
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: 'lax'
    },
    saveUninitialized: false,
    secret: COOKIE_SECRET
});

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>,
    messageRepository: EntityRepository<Message>
};

class App {
    public app: express.Application;
    public port: string | number;
    public server: Server;
    public wsServer: ws;
    public wsConnections = new Map();

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080; // add to environment variables
        this.server = createServer(this.app);

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeWSServer();
    }

    private async connectToDatabase(): Promise<void> {
        try {
            DI.orm = await MikroORM.init(mikroOrmConf);
            DI.em = DI.orm.em;
            DI.userRepository = DI.orm.em.getRepository(User);
            DI.messageRepository = DI.orm.em.getRepository(Message);
            await DI.orm.getSchemaGenerator().updateSchema();
        } catch(e: any) {
            console.log(e.message);
        }
        this.app.use((_1, _2, next) => RequestContext.create(DI.orm.em, next));
    }

    private initializeMiddlewares(): void {
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(sessionParser);
    }

    public listen(): void {
        this.server.listen(this.port, () => {
            console.log("=================================");
            console.log(`======= ENV: ${process.env.NODE_ENV || 'development'} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log("=================================");
        });
    }

    private initializeRoutes(): void {
        this.app.use('/', new ApiRoutes().router);
    }

    private async initializeWSServer(): Promise<void> {
        this.wsServer = new WebSocketServer({noServer: true});
        this.server.on('upgrade', (req: InstanceType<IncomingMessage>, socket: stream.Duplex, head) => {
            socket.on('error', (err) => console.log(err));
            console.log("Parsing session from request...");

            sessionParser(req, {}, () => {
                if (!req.session.userId) {
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();
                    return;
                }

                console.log('Session is parsed!');

                socket.removeListener('error', (err) => console.log(err));

                this.wsServer.handleUpgrade(req, socket, head, (ws) => {
                    this.wsServer.emit('connection', ws, req);
                });
            });
        });

        this.wsServer.on('connection', (ws, req) => {
            const userId = req.session.userId;

            this.wsConnections.set(userId, ws);

            ws.on('error', (err) => console.log(err));

            ws.on('message', (message) => {
                console.log(`Received message ${message} from user ${userId}`);
            });

            ws.on('close', () => {
                this.wsConnections.delete(userId);
            });

        })
    }
}

export default App;