import logger from "../../logger";
import IEmail, { EmailInput } from "../interface";

export default class NodeMailer implements IEmail {
    constructor() {}
    send<T>(input: EmailInput<T>) {
        logger.debug(`Email Messaging`, input)
    }
}