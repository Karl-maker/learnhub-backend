import IEmail, { EmailInput } from "../interface";

export default class NodeMailer implements IEmail {
    constructor() {}
    send<T>(imput: EmailInput<T>) {
        throw new Error("Method not implemented.");
    }
}