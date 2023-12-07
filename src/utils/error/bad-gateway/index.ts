import HTTPError from "../http";

export default class BadGatewayError extends HTTPError {

    constructor(message: string) {
        super(message, 502);
    }
}