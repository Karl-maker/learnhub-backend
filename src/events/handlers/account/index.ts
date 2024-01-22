import config from "../../../config";
import JWT from "../../../utils/jwt";
import IEmail, { StudentConfirmationContext } from "../../../helpers/email/interface";
import NodeMailer from "../../../helpers/email/nodemailer";
import event from "../../../helpers/event";
import logger from "../../../helpers/logger";
import AccountModel from "../../../models/account";
import AccountLoginModel from "../../../models/account-login";
import AccountRepository from "../../../repositories/account";
import AccountLoginRepository from "../../../repositories/account-login";
import { AccountRepositoryType } from "../../../repositories/account/interface";
import { AccountEventLoginPayload, AccountEventSignUpPayload, accountEvent } from "../../definitions/account";
import { StudentConfirmationPayload } from "../../../types";

export default () => {

    /**
     * @desc create login audit so all logins will be kept track of and user and check their logins
     */
    event.subscribe(accountEvent.topics.AccountLogin, (payload: AccountEventLoginPayload) => {
        (async ()=> {
            try {
                const accountLoginRepository = AccountLoginRepository.mock;
                const accountRepository = AccountRepository.mock;
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

    /**
     * @desc confirmation email
     * @todo add private and public key
     */
    event.subscribe(accountEvent.topics.AccountSignUp, (payload: AccountEventSignUpPayload) => {
        (async () => {
            try {

                if(payload.account.type === 'administrator') return;

                const token = new JWT("secret", "secret").create<StudentConfirmationPayload>({
                    iss: config.token.iss,
                    data: {
                        id: payload.account.id
                    }
                }, '15m');

                const BASE_URL = config.domain.url;
                const CONFIRMATION_URL = `${BASE_URL}/api/v1/account/confirmation/${token}`;
                const email: IEmail = new NodeMailer();

                email.send<StudentConfirmationContext>({
                    email: payload.account.email,
                    subject: `Confirmation Email`,
                    template: 'student-confirmation',
                    context: {
                        date: new Date(),
                        name: payload.account.first_name,
                        link: CONFIRMATION_URL
                    }
                });

            } catch(err) {
                logger.error(err.message, err);
            }

        })();
    })

}