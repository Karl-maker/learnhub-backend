import { MediaTypes } from "../../../utils/media/types";
import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IQuestionRepository extends IRepository<QuestionRepositoryType> {
    findByDifficulty(where: Partial<QuestionRepositoryType>, options: QuestionfindByDifficulty): Promise<QuestionRepositoryType[]>;
}

export type QuestionfindByDifficulty = {
    tier_level: number;
    range: number;
    amount: number;
}
export type QuestionRepositoryType = RepositoryDatabaseBaseType & {
    name: string; 
    description: string;
    tier_level: number;
    marks: number;
    content: ContentType[];
    multiple_choice?: MultipleChoiceType[];
    topic: string;
    tips?: TipType[];
}

export type ContentType = {
    type: MediaTypes;
    url?: string;
    text?: string;
}

export type TipType = ContentType & {}

export type MultipleChoiceType = {
    is_correct: boolean;
    content: ContentType;
}