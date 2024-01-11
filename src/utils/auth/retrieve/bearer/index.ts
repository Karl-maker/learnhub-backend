import { Request } from 'express';
import RetrieveTokenFromRequest from '../interface';
import UnauthorizedError from '../../../error/unauthorized';

export default class RetrieveBearerTokenFromRequest implements RetrieveTokenFromRequest {
    
    constructor() {}
    retrieve(request: Request): string {
        // Retrieve the token from the Authorization header
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            // Handle the case where there is no Authorization header
            throw new UnauthorizedError('No Authorization header found');
        }

        const [bearer, token] = authHeader.split(' ');

        if (!token || bearer.toLowerCase() !== 'bearer') {
            // Handle the case where the header format is incorrect
            throw new UnauthorizedError('Invalid Authorization header format');
        }

        return token;
    }
}
