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
     * @todo add event handler 
     */

    async signup<T>(signupService: ISignupService<T>): Promise<RequestHandler> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.body as T;
                await signupService.signup(data);
                
                res.json({
                    message: `Account created`
                })

            } catch(err) {
                next(err);
            }
        }
    }

    /**
     * @todo add event handler 
     */

    async login<T, Y>(loginService: ILoginService<T, Y>): Promise<RequestHandler> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.body as T;
                const tokens = await loginService.login(data);
                
                res.json({
                    tokens
                })

            } catch(err) {
                next(err);
            }
        }
    }
}