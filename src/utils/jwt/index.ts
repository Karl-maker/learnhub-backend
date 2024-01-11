import * as jwt from 'jsonwebtoken';
import InternalServerError from '../error/internal-server';

export type Payload<T> = {
    data: T;
    iss?: string;
};

export default class JWT {
    private public_key: string;
    private private_key: string;

    constructor(public_key: string, private_key: string) {
        this.private_key = private_key;
        this.public_key = public_key;
    }

    create<T>(payload: Payload<T>, expires: string): string {
        // Sign the token using the private key and set the expiration time
        const token = jwt.sign({ data: payload.data, iss: payload.iss }, this.private_key, { expiresIn: expires });
        return token;
    }

    verify<T>(token: string): Payload<T> {
        try {
            // Verify the token using the public key
            const decoded = jwt.verify(token, this.public_key) as Payload<T>;
            return decoded;
        } catch (error) {
            // If verification fails, you can handle the error as per your requirements
            throw new InternalServerError('Token verification failed');
        }
    }
}
