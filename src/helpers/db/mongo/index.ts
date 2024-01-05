import mongoose, { Connection, ConnectOptions } from 'mongoose';
import logger from '../../logger';

class MongoDBConnector {
  private static instance: MongoDBConnector;
  private connection: Connection | null = null;

  private constructor() {}

  static getInstance(): MongoDBConnector {
    if (!this.instance) {
      this.instance = new MongoDBConnector();
    }
    return this.instance;
  }

  async connect(databaseUri: string): Promise<void> {
    try {
      if (!this.connection) {
        const connection = await mongoose.connect(databaseUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions); 
        this.connection = connection.connection; // Get the underlying Connection instance
        logger.info('connected to mongodb');
      }
    } catch (error) {
      logger.error('connection to mongodb has issue', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        logger.info('disconnect to mongodb');
      }
    } catch (error) {
      logger.error('error disconnecting from mongodb:', error);
      throw error;
    } finally {
      this.connection = null;
    }
  }
}

export default MongoDBConnector;
