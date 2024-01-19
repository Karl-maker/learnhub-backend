import CourseController from "../../controllers/course";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import CourseModel from "../../models/course";
import CourseRepository from "../../repositories/course";
import { ICourseRepository } from "../../repositories/course/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/course';
const v1 = (server: IServer): express.Router => {
    const courseController = new CourseController();
    const courseRepository: ICourseRepository = CourseRepository.mock
    const courseModel = new CourseModel(courseRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('administrator', retrieveTokenBearer), courseController.create(courseModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('any', retrieveTokenBearer), courseController.findAll(courseModel));
    server.router.get(`${ROUTE}/:course_id`, localAuthentication.auth('any', retrieveTokenBearer), courseController.findById(courseModel));
    server.router.patch(`${ROUTE}/:course_id`, localAuthentication.auth('administrator', retrieveTokenBearer), courseController.updateById(courseModel));
    server.router.delete(`${ROUTE}/:course_id`, localAuthentication.auth('administrator', retrieveTokenBearer), courseController.deleteById(courseModel));

    return server.router;
}

export default {
    v1
};