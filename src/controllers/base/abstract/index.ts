import { RequestHandler, Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IBaseModel } from "../../../models/base/interface";
import IBaseController from "../interface";

export default abstract class AbstractBaseController implements IBaseController {
    private id: string;
    constructor(id: string) {
        this.id = id;
    }

    getById<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.findById(req.params[this.id]);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    getMany<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {

            } catch(err) {
                next(err);
            }
        }
    }
    create<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.create(req.body);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    updateById<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.updateById(req.params[this.id], req.body);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    updateMany<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {

            } catch(err) {
                next(err);
            }
        }
    }
    deleteById<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.deleteById(req.params[this.id]);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    deleteMany<T>(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {

            } catch(err) {
                next(err);
            }
        }
    }

}