import TopicController from "../../controllers/topic";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import TopicModel from "../../models/topic";
import TopicRepository from "../../repositories/topic";
import { ITopicRepository } from "../../repositories/topic/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/topic';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const topicController = new TopicController();
    const topicRepository: ITopicRepository = new TopicRepository.mock(MockDatabase.getInstance().database.topic);
    const topicModel = new TopicModel(topicRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), topicController.create(topicModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), topicController.findAll(topicModel));
    server.router.get(`${ROUTE}/:topic_id`, localAuthentication.auth('any', retrieveTokenBearer), topicController.findById(topicModel));
    server.router.patch(`${ROUTE}/:topic_id`, localAuthentication.auth('administrator', retrieveTokenBearer), topicController.updateById(topicModel));
    server.router.delete(`${ROUTE}/:topic_id`, localAuthentication.auth('administrator', retrieveTokenBearer), topicController.deleteById(topicModel));

    return server.router;
}

export default {
    v1
};