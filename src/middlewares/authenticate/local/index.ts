import { NextFunction, Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import AccountModel from "../../../models/account";
import Authenticate, { AuthAccountPayload } from "../interface";
import JWT, { Payload } from "../../../utils/jwt";
import { AccessAccountPayload } from "../../../service/login/local";
import { AccountRoles } from "../../../repositories/account/interface";
import UnauthorizedError from "../../../utils/error/unauthorized";
import RetrieveTokenFromRequest from "../../../utils/auth/retrieve/interface";

export default class LocalAuthentication implements Authenticate {
    jwt: JWT;
    constructor(jwt: JWT) {
        this.jwt = jwt;
    }
    auth(role: AccountRoles | 'any' = 'any', retrieveToken: RetrieveTokenFromRequest): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const token = retrieveToken.retrieve(req);
                const payload: Payload<AccessAccountPayload> = this.jwt.verify<AccessAccountPayload>(token);
                const account: AuthAccountPayload = {
                    id: payload.data.id,
                    role: payload.data.role
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