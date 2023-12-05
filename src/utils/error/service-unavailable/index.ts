import HTTPError from "../http";

export default class ServiceUnavailableError extends HTTPError {

    constructor(message: string) {
        super(message, 503);
    }
}