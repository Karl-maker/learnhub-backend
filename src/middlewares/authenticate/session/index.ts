import { NextFunction, Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Authenticate, { AuthAccountPayload } from "../interface";
import { AccountRoles } from "../../../repositories/account/interface";
import UnauthorizedError from "../../../utils/error/unauthorized";

export default class SessionAuthentication implements Authenticate {
    constructor() {}

    auth(role: AccountRoles | 'any' = 'any'): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{

                if(!req.session["account"]) throw new UnauthorizedError('Unauthorized');

                const userrole: AccountRoles = req.session["account"].role;
                const account: AuthAccountPayload = {
                    id: req.session["account"].data.id,
                    role: userrole
                };
                req['account'] = account;

                if(role !== req.session["account"].role && role !== 'any') {
                    throw new UnauthorizedError('Unauthorized');
                };

                next();

            } catch(err) {
                next(err)
            }
        }
    } 
}