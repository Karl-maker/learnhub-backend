import { AuthAccountPayload } from "../../middlewares/authenticate/interface";
import AccountLoginModel from "../../models/account-login";
import { SortDirection } from "../../models/base/interface";
import { AccountLoginRepositoryType } from "../../repositories/account-login/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";
import { RequestHandler, Request, Response, NextFunction } from 'express';

export default class AccountLoginController extends AbstractBaseController<AccountLoginRepositoryType> implements IBaseController<AccountLoginRepositoryType> {
    constructor() {
        super('account_id');
    }

    getCurrent(accountLoginModel: AccountLoginModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];
                const result = await accountLoginModel.findMany({ account_id: account.id }, {
                    sort: {
                        direction: req.query['direction'] as SortDirection | 'asc',
                        field: req.query['field'] as keyof AccountLoginRepositoryType | 'created_at'
                    },
                    page: {
                        size: Number(req.query['page_size']),
                        number: Number(req.query['page'])
                    }
                });

                res.json({
                    data: result.data,
                    count: result.amount
                })
            } catch(err) {
                next(err);
            }
        }
    }
}