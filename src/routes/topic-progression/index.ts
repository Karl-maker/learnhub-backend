import TopicProgressionController from "../../controllers/topic-progression";
import LocalAuthentication from "../../middlewares/authenticate/local";
import TopicProgressionModel from "../../models/topic-progression";
import TopicProgressionRepository from "../../repositories/topic-progression";
import { ITopicProgressionRepository } from "../../repositories/topic-progression/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/topic-progression';
const v1 = (server: IServer): express.Router => {
    const topicProgressionController = new TopicProgressionController();
    const topicProgressionRepository: ITopicProgressionRepository = TopicProgressionRepository.mock;
    const topicProgressionModel = new TopicProgressionModel(topicProgressionRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), topicProgressionController.create(topicProgressionModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), topicProgressionController.findAll(topicProgressionModel));
    server.router.get(`${ROUTE}/:topic_progression_id`, localAuthentication.auth('any', retrieveTokenBearer), topicProgressionController.findById(topicProgressionModel));
    server.router.patch(`${ROUTE}/:topic_progression_id`, localAuthentication.auth('student', retrieveTokenBearer), topicProgressionController.updateById(topicProgressionModel));
    server.router.delete(`${ROUTE}/:topic_progression_id`, localAuthentication.auth('administrator', retrieveTokenBearer), topicProgressionController.deleteById(topicProgressionModel));

    return server.router;
}

export default {
    v1
};