export default interface IEmail {
    send<T>(input: EmailInput<T>);
}

export type EmailInput<T> = {
    email: string;
    subject: string;
    template: DefaultTemplate | StudentConfirmationTemplate | StudentOnboardingTemplate;
    context: Context<T>;
};

export type Context<T> = T & {
    date: Date;
    name: string;
}

export type DefaultTemplate = 'default';
export type DefaultContext = {
    paragraph: string;
    title: string;
};

export type StudentConfirmationTemplate = 'student-confirmation';
export type StudentConfirmationContext = {
    link: string
};

export type StudentOnboardingTemplate = 'student-onboarding';
export type StudentOnboardingContext = {
    school?: string
};