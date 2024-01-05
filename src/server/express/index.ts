import express, { Application, RequestHandler } from 'express';
import ServerInterface, { ServerMethodType } from '../interface';
import logger from '../../helpers/logger';

class ExpressServer implements ServerInterface {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
  }

  public use(middleware: RequestHandler): void {
    this.app.use(middleware as RequestHandler);
  }

  public route(method: ServerMethodType, path: string, ...handlers: RequestHandler[]): void {
    this.app[method.toLowerCase()](path, ...handlers.map(handler => handler as RequestHandler));
  }

  public start(port: number): void {
    this.port = port;
    this.app.listen(port, () => {
      logger.info(`server is running on port: ${port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

export default ExpressServer;
