export default interface IEmail {
    send<T>(input: EmailInput<T>);
}

export type EmailInput<T> = {
    email: string;
    subject: string;
    template: AllowedTemplates;
    context: Context<T>;
};

type AllowedTemplates = DefaultTemplate | StudentConfirmationTemplate | StudentOnboardingTemplate | StudentQuizReportTemplate;

export type Context<T> = T & {
    name: string;
}

export type DefaultTemplate = 'information';
export type DefaultContext = {
    paragraph: string;
    title: string;
};

export type StudentConfirmationTemplate = 'student-confirmation';
export type StudentConfirmationContext = {
    link: string;
    support_email: string;
};

export type StudentOnboardingTemplate = 'student-onboarding';
export type StudentOnboardingContext = {
    school?: string
};

export type StudentQuizReportTemplate = 'quiz-report';
export type StudentQuizReportContext = {
    total_score: number;
    total_points: number;
    score: number;
    quiz_id: string;
    message: {
        title: string;
        note: string;
    };
};