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
    account: Partial<AccountRepositoryType>;
}

export type AccountEventLoginPayload = {
    ip?: string;
    account: {
        email?: string;
        mobile?: string;
    }
}

export {
    accountEvent
}
