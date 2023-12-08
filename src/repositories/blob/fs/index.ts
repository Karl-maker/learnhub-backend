import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { IBlobRepository, BlobRepositoryType } from '../interface';
import { promisify } from 'util';
import { RepositoryFindOptions, RepositoryFindResult, RepositoryUpdateResult, RepositoryDeleteResult } from '../../base/interface';

const writeFileAsync = promisify(fs.writeFile);

class FileSystemBlobRepository implements IBlobRepository {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async find(where: Partial<BlobRepositoryType>, options?: RepositoryFindOptions<BlobRepositoryType>): Promise<RepositoryFindResult<BlobRepositoryType>> {
    // Implement your find logic here (e.g., reading files in the directory)
    // You may need to map file system information to BlobRepositoryType properties
    const data: BlobRepositoryType[] = [];
    const amount: number = 0;
    return { data, amount };
  }

  async create(data: Partial<BlobRepositoryType>): Promise<BlobRepositoryType> {
    // Implement your create logic here (e.g., writing a buffer to a file)
    if(!data.id) data.id = uuid();
    const filePath = path.join(this.basePath, data.id + data.ext);

    await writeFileAsync(filePath, data.buffer);

    // Assuming BlobRepositoryType properties are filled after writing to the file
    const createdData: BlobRepositoryType = {
      id: data.id,
      file_name: data.file_name,
      created_at: new Date(),
      updated_at: new Date(),
      location: filePath, // Adding the location property
      ext: data.ext,
      v: 0
    };

    return createdData;
  }

  async update(where: Partial<BlobRepositoryType>, data: Partial<BlobRepositoryType>): Promise<RepositoryUpdateResult> {
    // Implement your update logic here (e.g., copying or overwriting an existing file)
    // You may need to handle the case where `where` and `data` specify different files
    // and update their metadata accordingly
    return { mutated: 0 }; // Placeholder, modify as needed
  }

  async delete(where: Partial<BlobRepositoryType>): Promise<RepositoryDeleteResult> {
    // Implement your delete logic here (e.g., deleting a file)
    // You may need to handle the case where multiple files are deleted
    const filePath = path.join(this.basePath, where.id + where.ext);

    await fs.promises.unlink(filePath);

    return { deleted: 1 }; // Placeholder, modify as needed
  }
}

export { FileSystemBlobRepository };
