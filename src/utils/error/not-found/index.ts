import HTTPError from "../http";

export default class NotFoundError extends HTTPError {

    constructor(message: string) {
        super(message, 404);
    }
}