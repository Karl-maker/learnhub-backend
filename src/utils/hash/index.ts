import bcrypt from 'bcrypt';
import logger from '../../helpers/logger';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const compareHash = async (password: string, hashPassword: string): Promise<boolean> => {
    logger.debug(`Enter compareHash(): `, {
        password,
        hashPassword
    })
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
};
