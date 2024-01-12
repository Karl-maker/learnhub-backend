import MockDatabase from "../../../helpers/db/mock";
import event from "../../../helpers/event";
import logger from "../../../helpers/logger";
import AccountModel from "../../../models/account";
import AccountLoginModel from "../../../models/account-login";
import AccountRepository from "../../../repositories/account";
import AccountLoginRepository from "../../../repositories/account-login";
import { AccountRepositoryType } from "../../../repositories/account/interface";
import { AccountEventLoginPayload, AccountEventSignUpPayload, accountEvent } from "../../definitions/account";

export default () => {

    /**
     * @desc create login audit so all logins will be kept track of and user and check their logins
     */
    event.subscribe(accountEvent.topics.AccountLogin, (payload: AccountEventLoginPayload) => {
        (async ()=> {
            try {
                const accountLoginRepository = new AccountLoginRepository.mock(MockDatabase.getInstance().database.account_login);
                const accountRepository = new AccountRepository.mock(MockDatabase.getInstance().database.account);
                const accountLoginModel = new AccountLoginModel(accountLoginRepository);
                const accountModel = new AccountModel(accountRepository);
    
                let account: Partial<AccountRepositoryType> = {};
    
                if(payload.account.email) account = await accountModel.findOne({ email: payload.account.email });
                else if(payload.account.mobile) account = await accountModel.findOne({ mobile: payload.account.mobile });
    
                await accountLoginModel.create({
                    method: payload.method,
                    ip_address: payload.ip,
                    account_id: account.id,
                });
            } catch(err) {
                logger.error(err.message, err);
            }
        })();
    })
    
    event.subscribe(accountEvent.topics.AccountSignUp, (payload: AccountEventSignUpPayload) => {
        logger.debug(accountEvent.topics.AccountSignUp, payload)
    })

}