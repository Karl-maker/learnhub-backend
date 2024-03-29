import { QuizRepositoryType } from "../../repositories/quiz/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";
import IQuizGenerator from "../../service/quiz-generator/interface";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { AuthAccountPayload } from "../../middlewares/authenticate/interface";
import StudentModel from "../../models/student";
import { EventEntityName } from "../../events/definitions/base";
import logger from "../../helpers/logger";

export default class QuizController extends AbstractBaseController<QuizRepositoryType> implements IBaseController<QuizRepositoryType> {
    constructor() {
        super('quiz_id');
        this.event = EventEntityName.quiz;
    }

    generate(quizGenerator: IQuizGenerator, studentModel: StudentModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try{
                logger.debug(`Enter Controller.generate()`);
                const account: AuthAccountPayload | null = req['account'];
                const topic: string = String(req.body.topic);
                const number_of_questions = Number(req.body.no_of_questions || 5);
                const range = Number(req.body.range || 5);
                const difficulty = Number(req.body.difficulty)
                const student = await studentModel.findOne({
                    account_id: account.id
                })
                logger.debug(`Enter Controller.generate().student: `, student);
                const quiz = await quizGenerator.generate(student.id, topic, number_of_questions || 5, difficulty, range);
                logger.debug(`Enter Controller.generate().quiz: `, quiz);
                res.json({
                    data: quiz
                });

            } catch(err) {
                next(err)
            }
        }
    }
}