// Importing IRepository interface from the specified path
import { IRepository } from "../../../repositories/base/interface";

/**
 * Interface representing a model abstraction for CRUD operations.
 * @template T - Generic type parameter representing the shape of the data managed by the model.
 */
export interface IBaseModel<T> {
    // A repository instance that handles data access for the model.
    repository: IRepository<T>;

    // Method to create a new data entry.
    create(data: Partial<T>): Promise<T>;

    // Method to find a data entry by its unique identifier.
    findById(id: string): Promise<T>;

    // Method to find one data entry based on specified criteria.
    findOne(where: Partial<T>): Promise<T>;

    // Method to find multiple data entries based on specified criteria.
    findMany(where: Partial<T>, options: FindManyOptions<T>): Promise<ModelFindManyResult<T>>;

    // Method to update a data entry by its unique identifier.
    updateById(id: string, update: T): Promise<ModelUpdateByIdResult<T>>;

    // Method to update one data entry based on specified criteria.
    updateOne(where: Partial<T>, update: T): Promise<T>;

    // Method to update multiple data entries based on specified criteria.
    updateMany(where: Partial<T>, update: T): Promise<ModelUpdateManyResult>;

    // Method to delete a data entry by its unique identifier.
    deleteById(id: string): Promise<ModelDeleteByIdResult<T>>;

    // Method to delete one data entry based on specified criteria.
    deleteOne(where: Partial<T>): Promise<ModelDeleteOneResult<T>>;

    // Method to delete multiple data entries based on specified criteria.
    deleteMany(where: Partial<T>): Promise<ModelDeleteManyResult>;
}

// Result type for the deleteMany method, indicating the number of records deleted.
export type ModelDeleteManyResult = {
    deleted: number;
}

// Result type for the updateById method, indicating the updated data and status.
export type ModelUpdateByIdResult<T> = {
    data: T;
    status: boolean;
}

// Result type for the deleteById method, indicating the deleted data and success status.
export type ModelDeleteByIdResult<T> = {
    data: T;
    successful: boolean;
}

// Result type for the deleteOne method, indicating the deleted data, and success status.
export type ModelDeleteOneResult<T> = ModelDeleteByIdResult<T>;

// Result type for the findMany method, including retrieved data and the total amount.
export type ModelFindManyResult<T> = {
    data: T[];
    amount: number;
}

// Result type for the updateMany method, indicating the number of records mutated.
export type ModelUpdateManyResult = {
    mutated: number;
}

export type SortDirection = 'asc' | 'desc';

export type FindManyOptions<T> = {
      sort: {
        field: keyof T; 
        direction: SortDirection;
      };
      page: {
        size: number;
        number: number;
      };
}
