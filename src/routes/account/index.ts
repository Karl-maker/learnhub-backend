import AccountController from "../../controllers/account";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import AccountModel from "../../models/account";
import AccountRepository from "../../repositories/account";
import { IAccountRepository } from "../../repositories/account/interface";
import IServer from "../../server";
import LocalLogin, { JWTLoginCredentials, JWTLoginResult } from "../../service/login/local";
import LocalSignup, { LocalSignupType } from "../../service/signup/local";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/account';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const accountController = new AccountController();
    const accountRepository: IAccountRepository = new AccountRepository.mongo(mongodb.connection);
    const accountModel = new AccountModel(accountRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    /**
     * @todo use proper keys from config
     */
    const refreshJwt = new JWT("secret", "secret");
    const signupService = new LocalSignup(accountModel);
    const loginService = new LocalLogin(accountModel, accessJwt, refreshJwt);
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}/signup`, accountController.signup<LocalSignupType>(signupService));
    server.router.post(`${ROUTE}/login`, accountController.login<JWTLoginCredentials, JWTLoginResult>(loginService));
    server.router.get(`${ROUTE}/current`, localAuthentication.auth('any', retrieveTokenBearer), accountController.current(accountModel));

    return server.router;
}

export default {
    v1
};