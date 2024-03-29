import AccountController from "../../controllers/account";
import LocalAuthentication from "../../middlewares/authenticate/local";
import AccountModel from "../../models/account";
import AccountRepository from "../../repositories/account";
import { IAccountRepository } from "../../repositories/account/interface";
import PasswordRecoveryPinRepository from "../../repositories/password-recovery-pin";
import IServer from "../../server";
import LocalLogin, { JWTLoginCredentials, JWTLoginResult } from "../../service/login/local";
import PasswordRecovery from "../../service/password-recovery/basic";
import LocalSignup, { LocalSignupType } from "../../service/signup/local";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/account';
const v1 = (server: IServer): express.Router => {
    const accountController = new AccountController();
    const accountRepository: IAccountRepository = AccountRepository.mongo;
    const accountModel = new AccountModel(accountRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    /**
     * @todo use proper keys from config
     */
    const refreshJwt = new JWT("secret", "secret");
    /**
     * @todo use proper keys from config
     */
    const confirmationJwt = new JWT("secret", "secret");
    /**
     * @todo use proper keys from config
     */
    const passwordRecoveryJwt = new JWT("secret", "secret");
    const signupService = new LocalSignup(accountModel);
    const loginService = new LocalLogin(accountModel, accessJwt, refreshJwt);
    const localAuthentication = new LocalAuthentication(accessJwt);
    const recoveryAuthentication = new LocalAuthentication(passwordRecoveryJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();
    const passwordRecoveryRepository = PasswordRecoveryPinRepository.mock;
    const passwordRecovery = new PasswordRecovery(
        passwordRecoveryRepository,
        accountModel,
        passwordRecoveryJwt
    )

    server.router.post(`${ROUTE}/signup`, accountController.signup<LocalSignupType>(signupService));
    server.router.post(`${ROUTE}/login`, accountController.login<JWTLoginCredentials, JWTLoginResult>(loginService));

    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountController.getCurrent(accountModel));
    server.router.patch(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountController.updateCurrent(accountModel));
    server.router.delete(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), accountController.deleteCurrent(accountModel));

    server.router.get(`${ROUTE}/confirmation/:token`, accountController.confirmByToken(accountModel, confirmationJwt));
    server.router.get(`${ROUTE}/password-recovery-email`, accountController.sendRecoverPasswordCodeToEmail(passwordRecovery));
    server.router.post(`${ROUTE}/password-recovery-email`, accountController.confirmRecoveryPasswordCode(passwordRecovery));
    server.router.post(`${ROUTE}/update-password`, recoveryAuthentication.auth('any', retrieveTokenBearer), accountController.updatePassword(accountModel));

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.create(accountModel));
    server.router.get(`${ROUTE}/:account_id`, accountController.findById(accountModel));
    server.router.patch(`${ROUTE}/:account_id`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.updateById(accountModel));
    server.router.delete(`${ROUTE}/:account_id`, localAuthentication.auth('administrator', retrieveTokenBearer), accountController.deleteById(accountModel));

    return server.router;
}

export default {
    v1
};