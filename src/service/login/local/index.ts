import config from "../../../config";
import logger from "../../../helpers/logger";
import AccountModel from "../../../models/account";
import { AccountRepositoryType, AccountRoles } from "../../../repositories/account/interface";
import UnauthorizedError from "../../../utils/error/unauthorized";
import { compareHash } from "../../../utils/hash";
import JWT, { Payload } from "../../../utils/jwt";
import ILoginService from "../interface";

export type JWTLoginCredentials = {
    email: string;
    password: string;
}

export type JWTLoginResult = {
    access_token: string;
    refresh_token: string;
}

export type RefreshAccountPayload = {
    id: string;

}

export type AccessAccountPayload = {
    id: string;
    role: AccountRoles;
}

export default class LocalLogin implements ILoginService<JWTLoginCredentials, JWTLoginResult>  {
    accountModel: AccountModel;
    refreshJwt: JWT;
    accessJwt: JWT;

    constructor(accountModel: AccountModel, accessJwt: JWT, refreshJwt: JWT) {
        this.accountModel = accountModel;
        this.accessJwt = accessJwt;
        this.refreshJwt = refreshJwt;
    }

    async login(credential: JWTLoginCredentials): Promise<JWTLoginResult> {
        try {
            const user = await this.accountModel.findOne({
                  email: credential.email
            });

            if(!user) throw new UnauthorizedError('entered wrong email or password');
            if(!await compareHash(credential.password, user.hash_password)) throw new UnauthorizedError('Wrong email or password entered');

            const payloadRefresh: Payload<RefreshAccountPayload> = {
                data: {
                    id: user.id
                },
                iss: config.token.iss
            }

            const role: AccountRoles = user.type;

            const payloadAccess: Payload<AccessAccountPayload> = {
                data: {
                    id: user.id,
                    role
                },
                iss: config.token.iss
            }

            const access_token = this.accessJwt.create<RefreshAccountPayload>(payloadAccess, '1d');
            const refresh_token = this.refreshJwt.create<RefreshAccountPayload>(payloadRefresh, '30d');
            
            return {
                access_token,
                refresh_token
            }
        } catch(err) {
            throw err;
        }
    }   
}
