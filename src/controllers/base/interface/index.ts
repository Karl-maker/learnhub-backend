import { RequestHandler } from "express";
import { IBaseModel } from "../../../models/base/interface";

export default interface IBaseController {
    getById<T>(model: IBaseModel<T>): RequestHandler;
    getMany<T>(model: IBaseModel<T>): RequestHandler;
    create<T>(model: IBaseModel<T>): RequestHandler;
    updateById<T>(model: IBaseModel<T>): RequestHandler;
    updateMany<T>(model: IBaseModel<T>): RequestHandler;
    deleteById<T>(model: IBaseModel<T>): RequestHandler;
    deleteMany<T>(model: IBaseModel<T>): RequestHandler;
}