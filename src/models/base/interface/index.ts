import { IDatabase } from "../../../helpers/db/interface";

/**
 * @desc This interface defines a generic model that uses a specific database.
 *       Implementing this interface allows for maintainability of the code.
 */
export interface IBaseModel<T> {
    database: IDatabase;
    collection: string;
    /**
     * @desc Creates a new record in the database.
     * @param data - Partial data for the new record.
     * @returns Promise containing the create response.
     */
    create: (data: Partial<T>) => Promise<CreateResponse>;

    /**
     * @desc Finds records in the database based on provided criteria.
     * @param where - Partial data to filter records.
     * @param options - Additional options for sorting and pagination.
     * @returns Promise containing the find response.
     */
    find: (where: Partial<T>, options?: FindOptions<T>) => Promise<FindResponse<T>>;

    /**
     * @desc Updates records in the database based on provided criteria.
     * @param where - Partial data to identify records to update.
     * @param data - Partial data with the updates.
     * @returns Promise containing the update response.
     */
    update: (where: Partial<T>, data: Partial<T>) => Promise<UpdateResponse>;

    /**
     * @desc Deletes records from the database based on provided criteria.
     * @param where - Partial data to identify records to delete.
     * @returns Promise containing the delete response.
     */
    delete: (where: Partial<T>) => Promise<DeleteResponse>;
}

// Options

/**
 * @desc Options for the find method, including sorting and pagination.
 */
export type FindOptions<T> = {
    sort: {
        direction: 'desc' | 'asc';
        field: keyof T;
    };
    pagination: {
        page: number;       // Current page number
        page_size: number;   // Number of records per page
        //... Additional pagination options can be added here.
    }
}

// Responses

/**
 * @desc Response for the create method.
 */
export type CreateResponse = {
    data: Partial<Base>;
}

/**
 * @desc Response for the find method.
 */
export type FindResponse<T> = {
    data: Partial<T>[];
    amount: number;
}

/**
 * @desc Response for the update method.
 */
export type UpdateResponse = {
    mutated: number;
}

/**
 * @desc Response for the delete method.
 */
export type DeleteResponse = {
    deleted: number;
}

// Base model attributes needed in all models

/**
 * @desc Base model attributes required in all models.
 */
export type Base = {
    id: string;
    v: number;
    created_at: Date;
    updated_at: Date;
}
