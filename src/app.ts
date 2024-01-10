import express from "express";
import ExpressServer from "./server/http";
import IServer from "./server";
import MongoDBConnector from "./helpers/db/mongo";
import logger from "./helpers/logger";
import config from "./config";
import AccountController from "./controllers/account";
import LocalSignup, { LocalSignupType } from "./service/signup/local";
import AccountModel from "./models/account";
import { IAccountRepository } from "./repositories/account/interface";
import errorHandler, { error404 } from "./helpers/error-handler";
import AccountRepository from "./repositories/account";

const app = express();
const port = config.port;
const server: IServer = new ExpressServer(app);
const mongo = MongoDBConnector.getInstance();
const mongo_db_uri = config.database[config.environment].uri;


(async() => {
    await mongo.connect(mongo_db_uri, {
      dbName: config.database[config.environment].name,
      user: config.database[config.environment].user,
      pass: config.database[config.environment].password, 
      retryWrites: true, 
      w: "majority" 
    });

    const accountController = new AccountController();
    const accountRepository: IAccountRepository = new AccountRepository.mongo(mongo.connection);
    const accountModel = new AccountModel(accountRepository);
    const signupService = new LocalSignup(accountModel);

    server.app.use(express.json())
    server.app.post('/signup', accountController.signup<LocalSignupType>(signupService));
    server.app.use(error404)
    server.app.use(errorHandler);

    // Start the server
    server.start(port, () => {
      logger.info(`service running on port: ${port}`)
    });

})();
