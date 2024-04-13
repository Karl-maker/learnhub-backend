import path from "path";
import { FileSystemBlobRepository } from "./fs";
import { S3BlobRepository } from "./s3";
import config from "../../config";

const baseDirectory = path.resolve(__dirname, '../../..');
const BlobRepository = {
    s3: S3BlobRepository,
    fs: new FileSystemBlobRepository(path.join(baseDirectory, config.fs.bucket), config.fs.url)
}

export default BlobRepository;