import { Request, Response, NextFunction } from "express";

export default abstract class ValidateBase<T> {

    static findAll<T>(req: Request, res: Response, next: NextFunction) {

        next();
    }   
    static create<T>(req: Request, res: Response, next: NextFunction) {
            
        next();
    }
    static updateMany<T>(req: Request, res: Response, next: NextFunction) {
            
        next();
    }
    static deleteMany<T>(req: Request, res: Response, next: NextFunction) {
            
        next();
    }
}