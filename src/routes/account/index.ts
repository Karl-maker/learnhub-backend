import AccountController from "../../controllers/account";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import AccountModel from "../../models/account";
import AccountRepository from "../../repositories/account";
import { AccountRepositoryType, IAccountRepository } from "../../repositories/account/interface";
import IServer from "../../server";
import LocalLogin, { JWTLoginCredentials, JWTLoginResult } from "../../service/login/local";
import LocalSignup, { LocalSignupType } from "../../service/signup/local";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/account';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const accountController = new AccountController();
    const accountRepository: IAccountRepository = new AccountRepository.mock(MockDatabase.getInstance().database.account);
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

    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountController.getCurrent(accountModel));
    server.router.patch(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountController.updateCurrent(accountModel));
    server.router.delete(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountController.deleteCurrent(accountModel));

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.create(accountModel));
    server.router.get(`${ROUTE}/:account_id`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.findById(accountModel));
    server.router.patch(`${ROUTE}/:account_id`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.updateById(accountModel));
    server.router.delete(`${ROUTE}/:account_id`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.deleteById(accountModel));

    return server.router;
}

export default {
    v1
};