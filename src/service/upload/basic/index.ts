import path from "path";
import { BlobRepositoryType, IBlobRepository } from "../../../repositories/blob/interface";
import { S3BlobRepository } from "../../../repositories/blob/s3";
import IUpload, { UploadCallback } from "../interface";
import { Express } from 'express';
import logger from "../../../helpers/logger";

export default class Upload implements IUpload {
    private repository: IBlobRepository;
    constructor(repository: IBlobRepository) {
        this.repository = repository;
    }
    async upload(file: Express.Multer.File, callback: (data: UploadCallback) => void, error: (err: Error) => void): Promise<void> {
        try {
            const fileNameWithExtension = file.originalname;
            const fileNameWithoutExtension = path.parse(fileNameWithExtension).name;
            const fileExtension = path.parse(fileNameWithExtension).ext;

            const data = {
                file_name: fileNameWithoutExtension,
                ext: fileExtension,
                buffer: file.buffer,
                // Add other properties as needed
            };

            const result = await this.repository.create(data);

            // Call the callback with the result
            callback({
                location: result.location,
                key: result.key,
                ext: result.ext
            });

        } catch(err) {
            error(new Error(err));
        }
    }
    async remove(key: string, ext?: string): Promise<void> {
        try {
            await this.repository.delete({
                id: key,
                ext: ext || ""
            });
        } catch(err) {
            logger.error('Issue removing s3 object', err);
        }
    }
    
}