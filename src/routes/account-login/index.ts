import AccountLoginController from "../../controllers/account-login";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import AccountLoginModel from "../../models/account-login";
import AccountLoginRepository from "../../repositories/account-login";
import { IAccountLoginRepository } from "../../repositories/account-login/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/account-login';
const v1 = (server: IServer): express.Router => {
    const accountLoginController = new AccountLoginController();
    const accountLoginRepository: IAccountLoginRepository = AccountLoginRepository.mock
    const accountLoginModel = new AccountLoginModel(accountLoginRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountLoginController.getCurrent(accountLoginModel));

    return server.router;
}

export default {
    v1
};