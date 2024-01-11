import { RequestHandler } from "express";
import { AccountRoles } from "../../../repositories/account/interface";
import RetrieveTokenFromRequest from "../../../utils/auth/retrieve/interface";

export default interface Authenticate {
    auth(role: AccountRoles, retrieveToken: RetrieveTokenFromRequest): RequestHandler;
}

export type AuthAccountPayload = {
    id: string;
    role: AccountRoles;
}