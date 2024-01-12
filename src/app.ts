import express from "express";
import ExpressServer from "./server/http";
import IServer from "./server";
import MongoDBConnector from "./helpers/db/mongo";
import logger from "./helpers/logger";
import config from "./config";
import errorHandler, { error404 } from "./helpers/error-handler";
import account from "./routes/account";
import account_login from "./routes/account-login";
import event from "./events/handlers";

const app = express();
const port = config.port;
const server: IServer = new ExpressServer(app);
const mongo = MongoDBConnector.getInstance();
const mongo_db_uri = config.database[config.environment].uri;


(async() => {
    // await mongo.connect(mongo_db_uri, {
    //   dbName: config.database[config.environment].name,
    //   user: config.database[config.environment].user,
    //   pass: config.database[config.environment].password, 
    //   retryWrites: true, 
    //   w: "majority" 
    // });

    server.app.use(express.json())
    server.app.use(`/api/v1`,
      account.v1(server, mongo),
      account_login.v1(server, mongo)
    )
    server.app.use(error404)
    server.app.use(errorHandler);

    // event handlers

    event.account();

    // start the server
    server.start(port, () => {
      logger.info(`service running on port: ${port}`)
    });

})();
