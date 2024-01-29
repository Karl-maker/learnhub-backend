import { Express } from 'express';

export default interface IUpload {
    upload(data: Express.Multer.File, callback: (data: UploadCallback) => void): Promise<void>;
    remove(key: string): Promise<void>;
}

export type UploadCallback = {
    location: string;
    key: string;
}