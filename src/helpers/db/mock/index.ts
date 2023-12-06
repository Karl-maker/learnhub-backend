import { IDatabase, ConnectResult, DeletionResult, CreateCollectionResult, UpdateResult, InsertResult } from "../interface";
import { FindOptions } from "../../../models/base/interface";
import { v4 as uuid } from 'uuid';

// Define a simple data structure to store mock data
interface MockDatabase {
    [collection: string]: {
        [id: string]: any;
    };
}

// Mock implementation of the database interface
export class MockDatabaseClient implements IDatabase {
    private database: MockDatabase = {};

    // Simulate a successful connection
    async connect(): Promise<ConnectResult> {
        return { successful: true };
    }

    // Simulate a successful disconnection
    async disconnect(): Promise<ConnectResult> {
        return { successful: true };
    }

    async find<T>(collection: string, condition: Partial<T>, options?: FindOptions<T>): Promise<T[]> {
        const collectionData = this.database[collection] || {};
        let result = Object.values(collectionData).filter(item => {
            for (const key in condition) {
                if (item[key] !== condition[key]) {
                    return false;
                }
            }
            return true;
        });

        // Apply sorting
        if (options && options.sort) {
            const { direction, field } = options.sort;
            result = result.sort((a, b) => {
                if (direction === 'asc') {
                    return a[field] > b[field] ? 1 : -1;
                } else {
                    return a[field] < b[field] ? 1 : -1;
                }
            });
        }

        // Apply pagination
        if (options && options.pagination) {
            const { page, page_size } = options.pagination;
            const startIndex = (page - 1) * page_size;
            const endIndex = startIndex + page_size;
            result = result.slice(startIndex, endIndex);
        }

        return result as T[];
    }

    // Simulate fetching the count of matching data from the mock database
    async exists<T>(collection: string, condition: Partial<T>): Promise<number> {
        const collectionData = this.database[collection] || {};
        const count = Object.values(collectionData).filter(item => {
            for (const key in condition) {
                if (item[key] !== condition[key]) {
                    return false;
                }
            }
            return true;
        }).length;
        return count;
    }

    // Simulate inserting data into the mock database
    async insert<T>(collection: string, data: Partial<T>): Promise<InsertResult<T>> {
        const id = uuid(); // Generate a random ID
        const newItem = { ...data, id, v: 1 };
        this.database[collection] = this.database[collection] || {};
        this.database[collection][id] = newItem;
        return { successful: true, data: newItem as T };
    }

    // Simulate updating data in the mock database
    async update<T>(collection: string, where: Partial<T>, data: Partial<T>): Promise<UpdateResult> {
        const collectionData = this.database[collection] || {};
        let amount = 0;

        // Update items that match the condition
        Object.values(collectionData).forEach(item => {
            let matches = true;
            for (const key in where) {
                if (item[key] !== where[key]) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                amount++;
                Object.assign(item, data);
            }
        });

        return { successful: true, amount };
    }

    // Simulate deleting data from the mock database
    async delete<T>(collection: string, where: Partial<T>): Promise<DeletionResult> {
        const collectionData = this.database[collection] || {};
        let amount = 0;

        // Delete items that match the condition
        Object.values(collectionData).forEach(item => {
            let matches = true;
            for (const key in where) {
                if (item[key] !== where[key]) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                amount++;
                delete this.database[collection][item.id];
            }
        });

        return { successful: true, amount };
    }

    // Simulate creating a table or schema in the mock database
    async createCollectionIfNoneExist<T>(collection: string): Promise<CreateCollectionResult> {
        this.database[collection] = this.database[collection] || {};
        return { successful: true };
    }
}
