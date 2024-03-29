import SubSubjectController from "../../controllers/sub-subject";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import SubSubjectModel from "../../models/sub-subject";
import SubSubjectRepository from "../../repositories/sub-subject";
import { ISubSubjectRepository } from "../../repositories/sub-subject/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/sub-subject';
const v1 = (server: IServer): express.Router => {
    const subSubjectController = new SubSubjectController();
    const subSubjectRepository: ISubSubjectRepository = SubSubjectRepository.mock;
    const subSubjectModel = new SubSubjectModel(subSubjectRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), subSubjectController.create(subSubjectModel));
    server.router.get(`${ROUTE}`, subSubjectController.findAll(subSubjectModel));
    server.router.get(`${ROUTE}/:sub_subject_id`, subSubjectController.findById(subSubjectModel));
    server.router.patch(`${ROUTE}/:sub_subject_id`, localAuthentication.auth('administrator', retrieveTokenBearer), subSubjectController.updateById(subSubjectModel));
    server.router.delete(`${ROUTE}/:sub_subject_id`, localAuthentication.auth('administrator', retrieveTokenBearer), subSubjectController.deleteById(subSubjectModel));

    return server.router;
}

export default {
    v1
};