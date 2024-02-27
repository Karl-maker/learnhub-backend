import { NextFunction, Request, RequestHandler, Response } from "express";
import AccountModel from "../../../models/account";
import Authenticate, { AuthAccountPayload } from "../interface";
import JWT, { Payload } from "../../../utils/jwt";
import { AccessAccountPayload } from "../../../service/login/local";
import { AccountRoles } from "../../../repositories/account/interface";
import UnauthorizedError from "../../../utils/error/unauthorized";
import RetrieveTokenFromRequest from "../../../utils/auth/retrieve/interface";
import logger from "../../../helpers/logger";

export default class LocalAuthentication implements Authenticate {
    jwt: JWT;
    constructor(jwt: JWT) {
        this.jwt = jwt;
    }
    auth(role: AccountRoles | 'any' = 'any', retrieveToken: RetrieveTokenFromRequest): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const token = retrieveToken.retrieve(req);
                const payload: Payload<AccessAccountPayload> = this.jwt.verify<AccessAccountPayload>(token);
                const userrole: AccountRoles = payload.data.role;
                const account: AuthAccountPayload = {
                    id: payload.data.id,
                    role: userrole
                };
                req['account'] = account;

                if(role !== payload.data.role && role !== 'any') {
                    throw new UnauthorizedError('Unauthorized');
                };

                next();

            } catch(err) {
                next(err)
            }
        }
    } 
}