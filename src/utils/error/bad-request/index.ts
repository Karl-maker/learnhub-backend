import HTTPError from "../http";

export default class BadRequestError extends HTTPError {

    constructor(message: string) {
        super(message, 400);
    }
}