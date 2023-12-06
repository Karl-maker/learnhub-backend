// Import the necessary interfaces and types from other modules
import { IDatabase } from "../../../helpers/db/interface";
import { Base, CreateResponse, DeleteResponse, FindOptions, FindResponse, IBaseModel, UpdateResponse } from "../interface";

/**
 * @desc Abstract base class for models implementing common CRUD operations.
 *       Models extending this class can reduce duplication of code.
 */
export abstract class BaseModel<T> implements IBaseModel<T> {
    /** @desc Property to store the database instance. */
    database: IDatabase;

    /** @desc Property to store the collection name. */
    collection: string;

    /**
     * @desc Constructor to initialize the collection and database when a model is instantiated.
     * @param collection - The name of the collection or table.
     * @param database - The database instance used for data operations.
     */
    constructor(collection: string, database: IDatabase) {
        this.database = database;
        this.collection = collection;
    }

    /**
     * @desc Method to create a new record in the collection.
     * @param data - The data to be inserted into the collection.
     * @returns A promise resolving with a formatted response object.
     */
    async create(data: Partial<T>): Promise<CreateResponse> {
        // Use the database instance to insert data into the collection
        const result = await this.database.insert<T>(this.collection, data);
        
        // Return a formatted response object with the created data
        return {
            data: result.data
        };
    }

    /**
     * @desc Method to find records in the collection based on a given condition and options.
     * @param where - Partial data representing the condition for finding records.
     * @param options - Options for the find operation, such as sorting and pagination.
     * @returns A promise resolving with a formatted response object containing the found data and total count.
     */
    async find(where: Partial<T>, options?: FindOptions<T>): Promise<FindResponse<T>> {
        // Use the database instance to find data in the collection
        const result = await this.database.find<T>(this.collection, where, options);
        
        // Use the database instance to determine the total count of matching records
        const count = await this.database.exists(this.collection, where);
        
        // Return a formatted response object with the found data and total count
        return {
            data: result,
            amount: count
        };
    }

    /**
     * @desc Method to update records in the collection based on a given condition.
     * @param where - Partial data representing the condition for updating records.
     * @param data - Partial data containing updates.
     * @returns A promise resolving with a formatted response object containing the number of updated records.
     */
    async update(where: Partial<T>, data: Partial<T>): Promise<UpdateResponse> {
        // Use the database instance to update data in the collection
        const result = await this.database.update<T>(this.collection, where, data);
        
        // Return a formatted response object with the number of updated records
        return {
            mutated: result.amount
        };
    }

    /**
     * @desc Method to delete records in the collection based on a given condition.
     * @param where - Partial data representing the condition for deleting records.
     * @returns A promise resolving with a formatted response object containing the number of deleted records.
     */
    async delete(where: Partial<T extends Base ? any : any>): Promise<DeleteResponse> {
        // Use the database instance to delete data from the collection
        const result = await this.database.delete(this.collection, where);
        
        // Return a formatted response object with the number of deleted records
        return {
            deleted: result.amount
        };
    }
}
