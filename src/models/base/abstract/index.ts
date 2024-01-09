import { IRepository } from "../../../repositories/base/interface";
import { FindManyOptions, IBaseModel, ModelDeleteByIdResult, ModelDeleteManyResult, ModelDeleteOneResult, ModelFindManyResult, ModelUpdateByIdResult, ModelUpdateManyResult } from "../interface";

/**
 * @todo complete code
 */

export abstract class AbstractBaseModel<T> implements IBaseModel<T> {
    repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    create(data: Partial<T>): Promise<Partial<T>> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Partial<T>> {
        throw new Error("Method not implemented.");
    }
    findOne(where: Partial<T>): Promise<Partial<T>> {
        throw new Error("Method not implemented.");
    }
    findMany(where: Partial<T>, options: FindManyOptions<T>): Promise<ModelFindManyResult<T>> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string, update: Partial<T>): Promise<ModelUpdateByIdResult<T>> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: Partial<T>, update: Partial<T>): Promise<Partial<T>> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: Partial<T>, update: Partial<T>): Promise<ModelUpdateManyResult> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<ModelDeleteByIdResult<T>> {
        throw new Error("Method not implemented.");
    }
    deleteOne(where: Partial<T>): Promise<ModelDeleteOneResult<T>> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: Partial<T>, update: Partial<T>): Promise<ModelDeleteManyResult> {
        throw new Error("Method not implemented.");
    }

}
