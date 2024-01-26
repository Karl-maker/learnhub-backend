import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IQuizRepository extends IRepository<QuizRepositoryType> {}
export type QuizRepositoryType = RepositoryDatabaseBaseType & {
    student_id: string; 
    questions: QuizQuestion[];
    type: QuizType;
    complete: boolean;
    score: number;
}

export type QuizQuestion = {
    id: string;
    possible_marks: number;
    earned_marks: number;
    completed: boolean;
    message?: string;
    tier_level: number;
}

export type QuizType = 'generated';