import express from "express";
import ExpressServer from "./server/http";
import IServer from "./server";
import MongoDBConnector from "./helpers/db/mongo";
import logger from "./helpers/logger";
import config from "./config";
import errorHandler, { error404 } from "./helpers/error-handler";
import account from "./routes/account";
import account_login from "./routes/account-login";
import student from "./routes/student";
import quiz from "./routes/quiz";
import question from "./routes/question";
import course from "./routes/course";
import subject from "./routes/subject";
import subsubject from "./routes/sub-subject";
import topic from "./routes/topic";
import topic_progression from "./routes/topic-progression"
import event from "./events/handlers";
import path from "path";

const app = express();
const port = config.port;
const server: IServer = new ExpressServer(app);
const mongo = MongoDBConnector;
const mongo_db_uri = config.database[config.environment].uri;
const fileRepositoryPath = path.resolve(__dirname, `../${config.fs.bucket}`);

(async() => {
    // await mongo.connect(mongo_db_uri, {
    //   dbName: config.database[config.environment].name,
    //   user: config.database[config.environment].user,
    //   pass: config.database[config.environment].password, 
    //   retryWrites: true, 
    //   w: "majority" 
    // });

    server.app.use(express.json())
    server.app.use(config.fs.route, express.static(fileRepositoryPath));
    server.app.use(`/api/v1`,
      account.v1(server),
      account_login.v1(server),
      student.v1(server),
      quiz.v1(server),
      question.v1(server),
      course.v1(server),
      subject.v1(server),
      subsubject.v1(server),
      topic.v1(server),
      topic_progression.v1(server)
    )
    server.app.use(error404)
    server.app.use(errorHandler);

    // event handlers
    event.account();
    event.quiz();
    event.student();

    // start the server
    server.start(port, () => {
      logger.info(`service running on port: ${port}`)
    });

})();
