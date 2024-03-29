import SubjectController from "../../controllers/subject";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import SubjectModel from "../../models/subject";
import SubjectRepository from "../../repositories/subject";
import { ISubjectRepository } from "../../repositories/subject/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/subject';
const v1 = (server: IServer): express.Router => {
    const subjectController = new SubjectController();
    const subjectRepository: ISubjectRepository = SubjectRepository.mock;
    const subjectModel = new SubjectModel(subjectRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), subjectController.create(subjectModel));
    server.router.get(`${ROUTE}`, subjectController.findAll(subjectModel));
    server.router.get(`${ROUTE}/:subject_id`, subjectController.findById(subjectModel));
    server.router.patch(`${ROUTE}/:subject_id`, localAuthentication.auth('administrator', retrieveTokenBearer), subjectController.updateById(subjectModel));
    server.router.delete(`${ROUTE}/:subject_id`, localAuthentication.auth('administrator', retrieveTokenBearer), subjectController.deleteById(subjectModel));

    return server.router;
}

export default {
    v1
};