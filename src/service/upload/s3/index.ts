import path from "path";
import { BlobRepositoryType } from "../../../repositories/blob/interface";
import { S3BlobRepository } from "../../../repositories/blob/s3";
import IUpload, { UploadCallback } from "../interface";
import { Express } from 'express';
import logger from "../../../helpers/logger";

export default class s3Upload implements IUpload {
    private repository: S3BlobRepository;
    constructor(repository: S3BlobRepository) {
        this.repository = repository;
    }
    async upload(file: Express.Multer.File, callback: (data: UploadCallback) => void): Promise<void> {
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
                key: result.key
            });

        } catch(err) {
            throw err;
        }
    }
    async remove(key: string): Promise<void> {
        try {
            await this.repository.delete({
                id: key
            });
        } catch(err) {
            logger.error('Issue removing s3 object', err);
        }
    }
    
}