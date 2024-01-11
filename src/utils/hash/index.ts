export type HashPasswordType = string;

export const hashPassword = (password: string): HashPasswordType => {
    let pass: HashPasswordType = password;
    return pass;
};

export const compareHash = (password: string, hashPassword: HashPasswordType): boolean => {
    return true;
}