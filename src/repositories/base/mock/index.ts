import { IRepository, RepositoryFindOptions, RepositoryFindResult, RepositoryUpdateResult, RepositoryDeleteResult, RepositoryDatabaseBaseType } from '../interface';
import { v4 as uuid } from 'uuid';
/**
 * Mock implementation of a generic repository for CRUD operations.
 */
export abstract class MockDatabaseRepository<T extends RepositoryDatabaseBaseType> implements IRepository<T> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  async find(where: Partial<T>, options?: RepositoryFindOptions<T>): Promise<RepositoryFindResult<T>> {
    // Mock implementation for the find method
    const filteredData = this.data.filter(item => {
      for (const key in where) {
        if (item[key] !== where[key]) {
          return false;
        }
      }
      return true;
    });

    // Mock implementation for sorting
    if (options?.sort) {
      const { field, direction } = options.sort;
      filteredData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // Mock implementation for pagination
    const { page = 1, size = filteredData.length } = options?.pagination || {};
    const startIndex = (page - 1) * size;
    const slicedData = filteredData.slice(startIndex, startIndex + size);

    return {
      data: slicedData,
      amount: filteredData.length,
    };
  }

  async create(data: Partial<T>): Promise<T> {

    data.id = uuid();
    data.created_at = new Date();
    data.updated_at = new Date();
    data.v = 1;

    const newItem: T = { ...(data as T) };
    this.data.push(newItem);
    return newItem;
  }

  async update(where: Partial<T>, data: Partial<T>): Promise<RepositoryUpdateResult> {
    // Mock implementation for the update method
    const updatedItems = this.data.filter(item => {
      for (const key in where) {
        if (item[key] !== where[key]) {
          return false;
        }
      }
      Object.assign(item, { ...data, v: item.v + 1, updated_at: new Date() });
      return true;
    });

    return {
      mutated: updatedItems.length,
    };
  }

  async delete(where: Partial<T>): Promise<RepositoryDeleteResult> {
    // Mock implementation for the delete method
    const initialLength = this.data.length;
    this.data = this.data.filter(item => {
      for (const key in where) {
        if (item[key] !== where[key]) {
          return true;  // Include items that do not match the delete criteria
        }
      }
      return false;  // Exclude items that match the delete criteria
    });
  
    return {
      deleted: initialLength - this.data.length,
    };
  }

}
