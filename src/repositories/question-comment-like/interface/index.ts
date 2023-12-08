import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IQuestionCommentLikeRepository extends IRepository<QuestionCommentLikeRepositoryType> {}
export type QuestionCommentLikeRepositoryType = RepositoryDatabaseBaseType & {
    question_comment_id: string;
    account_id: string;
}
