import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IQuizRepository extends IRepository<QuizRepositoryType> {}
export type QuizRepositoryType = RepositoryDatabaseBaseType & {
    student_id: string; 
    questions: QuizQuestion[];
    type: QuizType;
    progress: boolean;
}

export type QuizQuestion = {
    question_id: string;
    possible_marks: number;
    earned_marks: number;
    completed: boolean;
    message?: string;
}

export type QuizType = 'generated';