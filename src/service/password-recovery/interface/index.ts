export default interface IPasswordRecovery {
    sendPin(email: string): Promise<void>;
    confirm(email: string, pin: string): Promise<PasswordRecoveryConfirmType<any>>;
}

export type PasswordRecoveryConfirmType<T> = {
    success: boolean;
    data: T & {
        token: string;
    };
}