import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { IBlobRepository, BlobRepositoryType } from '../interface';
import { promisify } from 'util';
import { RepositoryFindOptions, RepositoryFindResult, RepositoryUpdateResult, RepositoryDeleteResult } from '../../base/interface';
import config from '../../../config';
import logger from '../../../helpers/logger';

const writeFileAsync = promisify(fs.writeFile);
const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);

class FileSystemBlobRepository implements IBlobRepository {
  private basePath: string;
  private baseURL: string;

  constructor(basePath: string, baseURL: string = `${config.fs.url}`) {
    this.basePath = basePath;
    this.baseURL = baseURL;

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
  }

  async find(where: BlobRepositoryType, options?: RepositoryFindOptions<BlobRepositoryType>): Promise<RepositoryFindResult<BlobRepositoryType>> {
    const files = await readdirAsync(this.basePath);

    const filteredFiles = files.filter((fileName) => {
      const fileExtension = path.extname(fileName);
      const fileId = path.basename(fileName, fileExtension);

      for (const key in where) {
        if (where[key] !== undefined && where[key] !== fileId) {
          return false;
        }
      }

      return true;
    });

    const data: BlobRepositoryType[] = [];
    const promises: Promise<void>[] = [];

    filteredFiles.forEach((fileName) => {
      const filePath = path.join(this.basePath, fileName);
      promises.push(
        statAsync(filePath)
          .then((stats) => {
            const fileExtension = path.extname(fileName);
            const fileId = path.basename(fileName, fileExtension);
            const contentType = ''; // You may need to determine content type based on file extension or content inspection

            data.push({
              id: fileId,
              v: 1, // Assuming a default version
              created_at: stats.birthtime,
              updated_at: stats.mtime,
              location: `${this.baseURL}/${fileId}${fileExtension}`,
              ext: fileExtension,
              file_name: fileName
            });
          })
          .catch((error) => {
            // Handle error if unable to get file stats
          })
      );
    });

    await Promise.all(promises);

    return { data, amount: data.length };
  }

  async create(data: BlobRepositoryType): Promise<BlobRepositoryType> {
    // Implement your create logic here (e.g., writing a buffer to a file)
    if(!data.id) data.id = uuid();
    const filePath = path.join(this.basePath, data.id + data.ext);

    try {
      await writeFileAsync(filePath, data.buffer);
    } catch (error) {
      logger.error(`Error writing file: ${error.message}`, error);
      throw error
    }

    // Assuming BlobRepositoryType properties are filled after writing to the file
    const createdData: BlobRepositoryType = {
      id: data.id,
      key: data.id,
      file_name: data.file_name,
      created_at: new Date(),
      updated_at: new Date(),
      location: `${this.baseURL}/${data.id}${data.ext}`, // Adding the location property
      ext: data.ext,
      v: 1
    };

    return createdData;
  }

  async update(where: BlobRepositoryType, data: BlobRepositoryType): Promise<RepositoryUpdateResult> {
    // Implement your update logic here (e.g., copying or overwriting an existing file)
    // You may need to handle the case where `where` and `data` specify different files
    // and update their metadata accordingly
    return { mutated: 0 }; // Placeholder, modify as needed
  }

  async delete(where: BlobRepositoryType): Promise<RepositoryDeleteResult> {
    // Implement your delete logic here (e.g., deleting a file)
    // You may need to handle the case where multiple files are deleted
    const filePath = path.join(this.basePath, where.id + where.ext);

    await fs.promises.unlink(filePath);

    return { deleted: 1 }; // Placeholder, modify as needed
  }
}

export { FileSystemBlobRepository };
