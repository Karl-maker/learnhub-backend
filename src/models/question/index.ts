import { IQuestionRepository, QuestionRepositoryType } from "../../repositories/question/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class QuestionModel extends AbstractBaseModel<QuestionRepositoryType> implements IBaseModel<QuestionRepositoryType> {
    constructor(repository: IQuestionRepository) {
        super(repository);
    } 
}
