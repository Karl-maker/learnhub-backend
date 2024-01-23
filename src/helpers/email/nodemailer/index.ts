import logger from "../../logger";
import IEmail, { EmailInput } from "../interface";
import sendEmail from "./method";

export default class NodeMailer implements IEmail {
    private configuration: NodeMailerConfig;
    constructor(configuration: NodeMailerConfig) {
        this.configuration = configuration;
    }
    send<T>(input: EmailInput<T>): void {
        (async() => {
            try {
                await sendEmail.call(
                    this.configuration, 
                    input.email,
                    input.subject,
                    input.template,
                    input.context
                );
            } catch(err) {
                logger.error(err.message, err);
            }
        })();
    }
}

export type NodeMailerConfig = {
    service: string;
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    },
    secure: boolean;
}
