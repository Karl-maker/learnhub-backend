import { RequestHandler, Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BlobRepositoryType, IBlobRepository } from "../../repositories/blob/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";
import ContentModel from "../../models/content";
import path from "path";

export default class ContentController extends AbstractBaseController<BlobRepositoryType> implements IBaseController<BlobRepositoryType> {
    constructor() {
        super('content_id');
    }

    create(model: ContentModel): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const file: Express.Multer.File = req.file;
                const fileNameWithExtension = file.originalname;
                const fileNameWithoutExtension = path.parse(fileNameWithExtension).name;
                const fileExtension = path.parse(fileNameWithExtension).ext;

                const data = {
                    file_name: fileNameWithoutExtension,
                    ext: fileExtension,
                    buffer: file.buffer,
                    // Add other properties as needed
                };

                const content = await model.create({
                    ...data
                });
                
                res.json({
                    data: content
                });
            } catch(err) {
                next(err);
            }
        }
    }
}