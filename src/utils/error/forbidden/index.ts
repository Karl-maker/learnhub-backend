import HTTPError from "../http";

export default class ForbiddenError extends HTTPError {

    constructor(message: string) {
        super(message, 403);
    }
}