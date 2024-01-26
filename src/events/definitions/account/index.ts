import { AccountLoginMethodsType } from "../../../repositories/account-login/interface";
import { AccountRepositoryType } from "../../../repositories/account/interface";

const topics = {
    AccountSignUp: 'account-signup',
    AccountLogin: 'account-login'
}

const accountEvent = {
    topics
}

export type AccountEventSignUpPayload = {
    ip?: string;
    account: AccountRepositoryType;
}

export type AccountEventLoginPayload = {
    ip?: string;
    method: AccountLoginMethodsType;
    account: {
        email?: string;
        mobile?: string;
    }
}

export {
    accountEvent
}
