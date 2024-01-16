import QuizController from "../../controllers/quiz";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import QuestionModel from "../../models/question";
import QuizModel from "../../models/quiz";
import StudentModel from "../../models/student";
import QuestionRepository from "../../repositories/question";
import { IQuestionRepository } from "../../repositories/question/interface";
import QuizRepository from "../../repositories/quiz";
import { IQuizRepository } from "../../repositories/quiz/interface";
import StudentRepository from "../../repositories/student";
import { IStudentRepository } from "../../repositories/student/interface";
import IServer from "../../server";
import BasicQuizGenerator from "../../service/quiz_generator/basic";
import IQuizGenerator from "../../service/quiz_generator/interface";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/quiz';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const quizController = new QuizController();
    const quizRepository: IQuizRepository = new QuizRepository.mock(MockDatabase.getInstance().database.quiz);
    const quizModel = new QuizModel(quizRepository);
    const questionRepository: IQuestionRepository = new QuestionRepository.mock(MockDatabase.getInstance().database.question);
    const questionModel = new QuestionModel(questionRepository)
    const studentRepository: IStudentRepository = new StudentRepository.mock(MockDatabase.getInstance().database.student);
    const studentModel = new StudentModel(studentRepository)
    const quizGenerator: IQuizGenerator = new BasicQuizGenerator(quizModel, questionModel);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), quizController.create(quizModel));
    server.router.post(`${ROUTE}/start`, localAuthentication.auth('student', retrieveTokenBearer), quizController.generate(quizGenerator, studentModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), quizController.findAll(quizModel));
    server.router.get(`${ROUTE}/:quiz_id`, localAuthentication.auth('any', retrieveTokenBearer), quizController.findById(quizModel));
    server.router.patch(`${ROUTE}/:quiz_id`, localAuthentication.auth('administrator', retrieveTokenBearer), quizController.updateById(quizModel));
    server.router.delete(`${ROUTE}/:quiz_id`, localAuthentication.auth('administrator', retrieveTokenBearer), quizController.deleteById(quizModel));

    return server.router;
}

export default {
    v1
};