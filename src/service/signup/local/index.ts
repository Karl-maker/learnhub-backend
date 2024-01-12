import AccountModel from "../../../models/account";
import { AccountRepositoryType } from "../../../repositories/account/interface";
import ForbiddenError from "../../../utils/error/forbidden";
import ISignupService from "../interface";

export type LocalSignupType = {
    email?: string;
    mobile?: string;
    password: string;
}

export default class LocalSignup implements ISignupService<LocalSignupType> {
    accountModel: AccountModel;
    constructor(accountModel: AccountModel) {
        this.accountModel = accountModel;
    }

    async signup(data: LocalSignupType): Promise<Partial<AccountRepositoryType>> {
        try {

            if(data.email) {
                const response = await this.accountModel.findMany({
                    email: data.email
                }, {
                    sort: {
                        field: 'created_at',
                        direction: 'desc'
                    },
                    page: {
                        size: 1,
                        number: 1
                    }
                });

                if(response.amount >= 1) {
                    // issue
                    throw new ForbiddenError('email already in use')
                }
            }

            if(data.mobile) {
                const response = await this.accountModel.findMany({
                    mobile: data.mobile
                }, {
                    sort: {
                        field: 'created_at',
                        direction: 'desc'
                    },
                    page: {
                        size: 1,
                        number: 1
                    }
                });

                if(response.amount >= 1) {
                    // issue
                    throw new ForbiddenError('mobile number already in use')
                }
            }

            const pass = data.password;
            delete data.password;

            const account = await this.accountModel.create({
                ...data,
                hash_password: pass
            });

            return {
                ...account
            }

        } catch(err) {
            throw err;
        }
    }
}