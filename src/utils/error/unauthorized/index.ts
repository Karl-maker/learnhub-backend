import HTTPError from "../http";

export default class UnauthorizedError extends HTTPError {

    constructor(message: string) {
        super(message, 401);
    }
}