import { Request, Response, NextFunction } from "express";
import ExpressServer from "./server/express";
import IServer from "./server/interface";
import MongoDBConnector from "./helpers/db/mongo";
import logger from "./helpers/logger";

const port = 8000;
const server: IServer = new ExpressServer();
const mongoConnector = MongoDBConnector.getInstance();

// Connect to MongoDB
mongoConnector.connect('mongodb://localhost:27017/your-database-name')
  .then(() => {
    // Middleware to log requests
    server.use((req: Request, res: Response, next: NextFunction) => {
      logger.debug(`Middleware Test`, req);
      next();
    });

    // Define routes
    server.route('get', '/', (req: Request, res: Response, next: NextFunction) => {
      res.json({
        message: 'Hello World'
      });
    });

    // Start the server
    server.start(port);
})
.catch((error) => {
    logger.fatal('failed to connect to mongodb:', error);
});
