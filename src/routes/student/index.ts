import StudentController from "../../controllers/student";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import StudentModel from "../../models/student";
import StudentRepository from "../../repositories/student";
import { IStudentRepository } from "../../repositories/student/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/student';
const v1 = (server: IServer, mongodb: MongoDBConnector): express.Router => {
    const studentController = new StudentController();
    const studentRepository: IStudentRepository = new StudentRepository.mongo(mongodb.connection);
    const studentModel = new StudentModel(studentRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), studentController.createCurrent(studentModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), studentController.getCurrent(studentModel));
    server.router.patch(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), studentController.updateCurrent(studentModel));

    return server.router;
}

export default {
    v1
};