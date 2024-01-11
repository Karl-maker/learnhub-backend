/**
 * @desc Interface representing a generic repository for CRUD operations (document / table).
 * @reponsibility Figuring out how data should be accessed from database.
 */

export interface IRepository<T> {
    /**
     * Find method to retrieve data based on specified criteria.
     * @param where - The criteria to filter the data.
     * @param options - Additional options for sorting and pagination.
     * @returns A promise containing the result of the find operation.
     */
    find(where: Partial<T>, options?: RepositoryFindOptions<T>): Promise<RepositoryFindResult<T>>;
  
    /**
     * Create method to add new data to the repository.
     * @param data - The data to be created.
     * @returns A promise containing the created data.
     */
    create(data: Partial<T>): Promise<T>;
  
    /**
     * Update method to modify existing data in the repository.
     * @param where - The criteria to identify the data to be updated.
     * @param data - The updated data.
     * @returns A promise containing the result of the update operation.
     */
    update(where: Partial<T>, data: Partial<T>): Promise<RepositoryUpdateResult>;

  
    /**
     * Delete method to remove data from the repository.
     * @param where - The criteria to identify the data to be deleted.
     * @returns A promise containing the result of the delete operation.
     */
    delete(where: Partial<T>): Promise<RepositoryDeleteResult>;
}

/**
 * Options for the find operation, including sorting and pagination.
 */

export type RepositoryFindOptions<T> = {
    sort: {
      direction: 'asc' | 'desc';
      field: keyof T | 'created_at';
    };
    pagination: {
      page: number;
      size: number;
    };
}
  
/**
 * Result of the find operation, including retrieved data and the total amount.
 */

export type RepositoryFindResult<T> = {
    data: T[];
    amount: number;
}
  
/**
 * Result of the update operation, indicating the number of records mutated.
 */

export type RepositoryUpdateResult = {
    mutated: number;
}
  
/**
 * Result of the delete operation, indicating the number of records deleted.
 */

export type RepositoryDeleteResult = {
    deleted: number;
}

export type RepositoryDatabaseBaseType = {
    id: string;
    v: number;
    created_at: Date;
    updated_at: Date;
}