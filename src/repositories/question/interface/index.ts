import { MediaTypes } from "../../../utils/media/types";
import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IQuestionRepository extends IRepository<QuestionRepositoryType> {
    findByTierLevel(where: Partial<QuestionRepositoryType>, options: QuestionFindByTierLevel): Promise<QuestionRepositoryType[]>;
}

export type QuestionFindByTierLevel = {
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