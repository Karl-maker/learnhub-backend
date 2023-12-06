import { FindOptions } from "../../../models/base/interface";

/**
 * @desc Interface for a generic database connection.
 */
export interface IDatabase {
    /**
     * @desc Connects to the database.
     * @returns Promise that resolves when the connection is successful.
     */
    connect: () => Promise<ConnectResult>;

    /**
     * @desc Disconnects from the database.
     * @returns Promise that resolves when the disconnection is successful.
     */
    disconnect: () => Promise<ConnectResult>;

    /**
     * @desc Fetches data from the database based on a specific condition.
     * @param collection - The name of the collection or table.
     * @param condition - The condition to match for fetching data.
     * @returns Promise that resolves with the fetched data.
     */
    find: <T>(collection: string, condition: Partial<T>, options?: FindOptions<T>) => Promise<T[]>;

    /**
     * @desc Fetches data from the database based on a specific condition.
     * @param collection - The name of the collection or table.
     * @param condition - The condition to match for fetching data.
     * @returns Promise that resolves with amount of data that matches.
     */
    exists: <T>(collection: string, condition: Partial<T>) => Promise<number>;

    /**
     * @desc Inserts a document or row into the database.
     * @param collection - The name of the collection or table.
     * @param data - The data to insert into the database.
     * @returns Promise that resolves with the insert result.
     */
    insert: <T>(collection: string, data: Partial<T>) => Promise<InsertResult<T>>;

    /**
     * @desc Updates documents or rows in the database.
     * @param collection - The name of the collection or table.
     * @param where - Partial data to identify records to update.
     * @param data - Partial data with the updates.
     * @returns Promise that resolves with the update result.
     */
    update: <T>(collection: string, where: Partial<T>, data: Partial<T>) => Promise<UpdateResult>;

    /**
     * @desc Deletes documents or rows from the database.
     * @param collection - The name of the collection or table.
     * @param where - Partial data to identify records to delete.
     * @returns Promise that resolves with the delete result.
     */
    delete: <T>(collection: string, where: Partial<T>) => Promise<DeletionResult>;

    /**
     * @desc Creates a table or schema in the database.
     * @param collection - The name of the collection or table to create.
     * @param schema - The schema or structure for the table.
     * @returns Promise that resolves when the table or schema is created.
     */
    createCollectionIfNoneExist: <T>(collection: string) => Promise<CreateCollectionResult>;
}

export type ConnectResult = {
    successful: boolean;
}

export type DeletionResult = {
    successful: boolean;
    amount: number;
}

export type CreateCollectionResult = {
    successful: boolean;
}

export type UpdateResult = {
    successful: boolean;
    amount: number;
}

export type InsertResult<T> = {
    successful: boolean;
    data: T;
}