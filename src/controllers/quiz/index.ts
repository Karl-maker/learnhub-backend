import { QuizRepositoryType } from "../../repositories/quiz/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class QuizController extends AbstractBaseController<QuizRepositoryType> implements IBaseController<QuizRepositoryType> {
    constructor() {
        super('quiz_id');
    }
}