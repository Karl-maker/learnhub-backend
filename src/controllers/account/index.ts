import { AccountEventLoginPayload, AccountEventSignUpPayload, accountEvent } from "../../events/definitions/account";
import event from "../../helpers/event";
import { AuthAccountPayload } from "../../middlewares/authenticate/interface";
import AccountModel from "../../models/account";
import { AccountLoginMethodsType } from "../../repositories/account-login/interface";
import { AccountRepositoryType } from "../../repositories/account/interface";
import ILoginService from "../../service/login/interface";
import ISignupService from "../../service/signup/interface";
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
                const result = await accountModel.updateById(account.id, req.body);

                res.json({
                    data: result.data,
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

                res.json({
                    data: result.data,
                    deleted: result.successful
                })

            } catch(err) {
                next(err);
            }
        }
    }

}