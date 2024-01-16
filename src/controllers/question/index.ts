import { QuestionRepositoryType } from "../../repositories/question/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class QuestionController extends AbstractBaseController<QuestionRepositoryType> implements IBaseController<QuestionRepositoryType> {
    constructor() {
        super('question_id');
    }
}