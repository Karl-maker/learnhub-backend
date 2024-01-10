import config from "../../../config";
import AccountModel from "../../../models/account";
import { AccountRoles } from "../../../repositories/account/interface";
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
    jwt: JWT;

    constructor(accountModel: AccountModel, jwt: JWT) {
        this.accountModel = accountModel;
        this.jwt = jwt;
    }

    async login(credential: JWTLoginCredentials): Promise<JWTLoginResult> {
        try {
            const user = await this.accountModel.findOne({
                  email: credential.email
            });

            if(!user) throw new UnauthorizedError('Wrong email or password entered');
            if(!compareHash(credential.password, user.hash_password)) throw new UnauthorizedError('Wrong email or password entered');

            const payloadRefresh: Payload<RefreshAccountPayload> = {
                data: {
                    id: user.id
                },
                iss: config.token.iss
            }

            const payloadAccess: Payload<AccessAccountPayload> = {
                data: {
                    id: user.id,
                    role: user.type
                },
                iss: config.token.iss
            }

            const access_token = this.jwt.create<RefreshAccountPayload>(payloadRefresh, '1d');
            const refresh_token = this.jwt.create<AccessAccountPayload>(payloadAccess, '30d');
            
            return {
                access_token,
                refresh_token
            }
        } catch(err) {

        }
    }   
}
