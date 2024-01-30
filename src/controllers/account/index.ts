import config from "../../config";
import { AccountEventLoginPayload, AccountEventSignUpPayload, accountEvent } from "../../events/definitions/account";
import event from "../../helpers/event";
import logger from "../../helpers/logger";
import { AuthAccountPayload } from "../../middlewares/authenticate/interface";
import AccountModel from "../../models/account";
import { AccountLoginMethodsType } from "../../repositories/account-login/interface";
import { AccountRepositoryType } from "../../repositories/account/interface";
import ILoginService from "../../service/login/interface";
import IPasswordRecovery from "../../service/password-recovery/interface";
import ISignupService from "../../service/signup/interface";
import { StudentConfirmationPayload } from "../../types";
import { generateRandomString } from "../../utils/code";
import JWT from "../../utils/jwt";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";
import { RequestHandler, Request, Response, NextFunction } from 'express';

export default class AccountController extends AbstractBaseController<AccountRepositoryType> implements IBaseController<AccountRepositoryType> {
    constructor() {
        super('account_id');
    }

    /**
     * @todo add ip address
     */

    signup<T>(signupService: ISignupService<T>): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.body as T;
                const account = await signupService.signup(data);
    
                const payload: AccountEventSignUpPayload = {
                    account
                }
                event.publish(accountEvent.topics.AccountSignUp, payload);
                
                res.json({
                    message: `Account created`
                });
    
            } catch(err) {
                next(err);
            }
        }
    }

    /**
     * @todo add ip address
     */

    login<T, Y>(loginService: ILoginService<T, Y>, method: AccountLoginMethodsType = 'local'): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.body as T;
                const result = await loginService.login(data);

                const payload: AccountEventLoginPayload = {
                    account: {
                        email: data['email'] || null,
                        mobile: data['mobile'] || null,
                    },
                    method
                }
                event.publish(accountEvent.topics.AccountLogin, payload);
                
                res.json({
                    tokens: result
                })

            } catch(err) {
                next(err);
            }
        }
    }

    getCurrent(accountModel: AccountModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];
                const result = await accountModel.findById(account.id);

                delete result.hash_password;

                res.json({
                    data: result
                })
            } catch(err) {
                next(err);
            }
        }
    }

    updateCurrent(accountModel: AccountModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];
                const data = req.body as AccountRepositoryType;
                if(req.body.password){ 
                    data['hash_password'] = req.body.password;
                    delete data['password'];
                }
                const result = await accountModel.updateById(account.id, data);

                delete result.data.hash_password;

                res.json({
                    data: result.data,
                    updated: result.status
                })

            } catch(err) {
                next(err);
            }
        }
    }

    updatePassword(accountModel: AccountModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];
                const data: Partial<AccountRepositoryType> = {};
                data['hash_password'] = req.body.password;
                delete data['password'];
            
                const result = await accountModel.updateById(account.id, data);

                logger.debug(`updatePassword() result: `, result);

                res.json({
                    updated: result.status
                })

            } catch(err) {
                next(err);
            }
        }
    }

    deleteCurrent(accountModel: AccountModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];
                const result = await accountModel.deleteById(account.id);

                delete result.data.hash_password;

                res.json({
                    data: result.data,
                    deleted: result.successful
                })

            } catch(err) {
                next(err);
            }
        }
    }
    
    confirmByToken(accountModel: AccountModel, JWT: JWT): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const id = JWT.verify<StudentConfirmationPayload>(req.params.token).data.id;
                await accountModel.updateById(id, { confirmed: true });
                res.redirect(config.redirects.confirmation.success.url)
            } catch(err) {
                res.redirect(config.redirects.confirmation.fail.url)
                next(err);
            }
        }
    }

    sendRecoverPasswordCodeToEmail(passwordRecoveryService: IPasswordRecovery): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                await passwordRecoveryService.sendPin(String(req.query['email']));
                res.json( {
                    message: 'Check Email'
                })
            } catch(err) {
                next(err);
            }
        }
    }

    confirmRecoveryPasswordCode(passwordRecoveryService: IPasswordRecovery): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await passwordRecoveryService.confirm(String(req.body['email']), String(req.body['pin']));
                res.json( {
                    data: result.data,
                    success: result.success
                })
            } catch(err) {
                next(err);
            }
        }
    }

}