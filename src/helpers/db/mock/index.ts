import logger from '../../logger';
import { AccountRepositoryType } from '../../../repositories/account/interface';

class MockDatabase {
  private static instance: MockDatabase;
  database: {
    account: AccountRepositoryType[];
  }

  private constructor() {
    this.database = {
        account: []
    }
  }

  static getInstance(): MockDatabase {
    if (!this.instance) {
      this.instance = new MockDatabase();
    }
    return this.instance;
  }

  async connect(): Promise<void> {
    try {
      logger.info("using mock database :)");
    } catch (error) {
      logger.error('connection to mock has issue', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      logger.info('disconnect from mock');
    } catch (error) {
      logger.error('error disconnecting from mock:', error);
      throw error;
    } finally {
      
    }
  }
}

export default MockDatabase;
