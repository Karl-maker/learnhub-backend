import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const compareHash = async (password: string, hashPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
};
