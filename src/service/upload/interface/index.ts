import { Express } from 'express';

export default interface IUpload {
    upload(data: Express.Multer.File, callback: (key: string) => void): Promise<void>;
}