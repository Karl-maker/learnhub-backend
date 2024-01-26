import path from "path";
import { BlobRepositoryType } from "../../../repositories/blob/interface";
import { S3BlobRepository } from "../../../repositories/blob/s3";
import IUpload from "../interface";
import { Express } from 'express';

export default class s3Upload implements IUpload {
    private repository: S3BlobRepository;
    constructor(repository: S3BlobRepository) {
        this.repository = repository;
    }
    async upload(file: Express.Multer.File, callback: (key: string) => void): Promise<void> {
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
            callback(result.location);

        } catch(err) {
            throw err;
        }
    }
    
}