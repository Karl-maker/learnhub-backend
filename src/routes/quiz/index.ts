import QuizController from "../../controllers/quiz";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import QuizModel from "../../models/quiz";
import QuizRepository from "../../repositories/quiz";
import { IQuizRepository } from "../../repositories/quiz/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/quiz';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const quizController = new QuizController();
    const quizRepository: IQuizRepository = new QuizRepository.mock(MockDatabase.getInstance().database.quiz);
    const quizModel = new QuizModel(quizRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), quizController.create(quizModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), quizController.findAll(quizModel));
    server.router.get(`${ROUTE}/:quiz_id`, localAuthentication.auth('any', retrieveTokenBearer), quizController.findById(quizModel));
    server.router.patch(`${ROUTE}/:quiz_id`, localAuthentication.auth('administrator', retrieveTokenBearer), quizController.updateById(quizModel));
    server.router.delete(`${ROUTE}/:quiz_id`, localAuthentication.auth('administrator', retrieveTokenBearer), quizController.deleteById(quizModel));

    return server.router;
}

export default {
    v1
};