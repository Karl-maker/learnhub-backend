import { IQuizRepository, QuizRepositoryType } from "../../repositories/quiz/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class QuizModel extends AbstractBaseModel<QuizRepositoryType> implements IBaseModel<QuizRepositoryType> {
    constructor(repository: IQuizRepository) {
        super(repository);
    } 
}
