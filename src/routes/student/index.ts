import multer from "multer";
import StudentController from "../../controllers/student";
import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import LocalAuthentication from "../../middlewares/authenticate/local";
import StudentModel from "../../models/student";
import BlobRepository from "../../repositories/blob";
import { IBlobRepository } from "../../repositories/blob/interface";
import StudentRepository from "../../repositories/student";
import { IStudentRepository } from "../../repositories/student/interface";
import IServer from "../../server";
import Upload from "../../service/upload/basic";
import IUpload from "../../service/upload/interface";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/student';
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

const v1 = (server: IServer): express.Router => {
    const studentController = new StudentController();
    const studentRepository: IStudentRepository = StudentRepository.mock;
    const studentModel = new StudentModel(studentRepository);
    const fileRepository: IBlobRepository = BlobRepository.fs;
    const uploadService: IUpload = new Upload(fileRepository)
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), studentController.createCurrent(studentModel));
    server.router.get(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), studentController.getCurrent(studentModel));
    server.router.patch(`${ROUTE}`, localAuthentication.auth('student', retrieveTokenBearer), studentController.updateCurrent(studentModel));
    server.router.post(`${ROUTE}/upload-profile-picture`, localAuthentication.auth('student', retrieveTokenBearer), upload.single('profile-picture'), studentController.uploadProfilePicture(studentModel, uploadService));

    return server.router;
}

export default {
    v1
};