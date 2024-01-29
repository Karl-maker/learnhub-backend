import { Express } from 'express';

export default interface IUpload {
    upload(data: Express.Multer.File, callback: (data: UploadCallback) => void, error: (err: Error) => void): Promise<void>;
    remove(key: string, ext?: string): Promise<void>;
}

export type UploadCallback = {
    location: string;
    key: string;
    ext: string;
}