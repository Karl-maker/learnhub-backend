import QuestionController from "../../controllers/question";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import QuestionModel from "../../models/question";
import QuestionRepository from "../../repositories/question";
import { IQuestionRepository } from "../../repositories/question/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/question';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const questionController = new QuestionController();
    const questionRepository: IQuestionRepository = new QuestionRepository.mock(MockDatabase.getInstance().database.question);
    const questionModel = new QuestionModel(questionRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), questionController.create(questionModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), questionController.findAll(questionModel));
    server.router.get(`${ROUTE}/:question_id`, localAuthentication.auth('any', retrieveTokenBearer), questionController.findById(questionModel));
    server.router.patch(`${ROUTE}/:question_id`, localAuthentication.auth('administrator', retrieveTokenBearer), questionController.updateById(questionModel));
    server.router.delete(`${ROUTE}/:question_id`, localAuthentication.auth('administrator', retrieveTokenBearer), questionController.deleteById(questionModel));

    return server.router;
}

export default {
    v1
};