import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IQuestionCommentRepository extends IRepository<QuestionCommentRepositoryType> {}
export type QuestionCommentRepositoryType = RepositoryDatabaseBaseType & {
    reply?: string; // another question comment_id
    text: string;
    question_id: string;
    account_id: string;
    likes: number;
}
