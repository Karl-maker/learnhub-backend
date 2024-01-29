import multer from "multer";
import ContentController from "../../controllers/content";
import LocalAuthentication from "../../middlewares/authenticate/local";
import ContentModel from "../../models/content";
import BlobRepository from "../../repositories/blob";
import { IBlobRepository } from "../../repositories/blob/interface";
import IServer from "../../server";
import RetrieveBearerTokenFromRequest from "../../utils/auth/retrieve/bearer";
import JWT from "../../utils/jwt";
import express from 'express';

const ROUTE = '/content';
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

const v1 = (server: IServer): express.Router => {
    const contentController = new ContentController();
    const contentRepository: IBlobRepository = BlobRepository.fs;
    const contentModel = new ContentModel(contentRepository);
    /**
     * @todo use proper keys from config
     */
    const accessJwt = new JWT("secret", "secret");
    const localAuthentication = new LocalAuthentication(accessJwt);
    const retrieveTokenBearer = new RetrieveBearerTokenFromRequest();

    server.router.post(`${ROUTE}`, 
    //localAuthentication.auth('administrator', retrieveTokenBearer), 
    upload.single('content'),
    contentController.create(contentModel));
    server.router.get(`${ROUTE}`, 
    //localAuthentication.auth('administrator', retrieveTokenBearer), 
    contentController.findAll(contentModel));
    server.router.get(`${ROUTE}/:content_id`, 
    //localAuthentication.auth('administrator', retrieveTokenBearer), 
    contentController.findById(contentModel));
    server.router.delete(`${ROUTE}/:content_id`, 
    //localAuthentication.auth('administrator', retrieveTokenBearer), 
    contentController.deleteById(contentModel));

    return server.router;
}

export default {
    v1
};