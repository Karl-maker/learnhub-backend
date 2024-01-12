import event from "../../../helpers/event";
import logger from "../../../helpers/logger";
import { AccountEventLoginPayload, AccountEventSignUpPayload, accountEvent } from "../../definitions/account";

export default () => {

    event.subscribe(accountEvent.topics.AccountLogin, (payload: AccountEventLoginPayload) => {
        logger.debug(accountEvent.topics.AccountLogin, payload)
    })
    
    event.subscribe(accountEvent.topics.AccountSignUp, (payload: AccountEventSignUpPayload) => {
        logger.debug(accountEvent.topics.AccountSignUp, payload)
    })

}