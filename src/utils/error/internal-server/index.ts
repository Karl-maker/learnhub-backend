import HTTPError from "../http";

export default class InternalServerError extends HTTPError {

    constructor(message: string) {
        super(message, 500);
    }
}