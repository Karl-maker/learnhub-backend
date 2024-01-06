import { RequestHandler } from "express";
import { IBaseModel } from "../../../models/base/interface";

export default interface IBaseController<T> {
    findById(model: IBaseModel<T>): RequestHandler;
    findAll(model: IBaseModel<T>): RequestHandler;
    create(model: IBaseModel<T>): RequestHandler;
    updateById(model: IBaseModel<T>): RequestHandler;
    updateMany(model: IBaseModel<T>): RequestHandler;
    deleteById(model: IBaseModel<T>): RequestHandler;
    deleteMany(model: IBaseModel<T>): RequestHandler;
}