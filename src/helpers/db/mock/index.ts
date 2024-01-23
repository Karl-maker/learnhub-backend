import logger from '../../logger';
import { AccountRepositoryType } from '../../../repositories/account/interface';
import { AccountLoginRepositoryType } from '../../../repositories/account-login/interface';
import { StudentRepositoryType } from '../../../repositories/student/interface';
import { TopicRepositoryType } from '../../../repositories/topic/interface';
import { SubjectRepositoryType } from '../../../repositories/subject/interface';
import { SubSubjectRepositoryType } from '../../../repositories/sub-subject/interface';
import { CourseRepositoryType } from '../../../repositories/course/interface';
import { QuizRepositoryType } from '../../../repositories/quiz/interface';
import { QuestionRepositoryType } from '../../../repositories/question/interface';
import { TopicProgressionRepositoryType } from '../../../repositories/topic-progression/interface';

class MockDatabase {
  private static instance: MockDatabase;
  database: {
    account: AccountRepositoryType[];
    account_login: AccountLoginRepositoryType[];
    student: StudentRepositoryType[];
    topic: TopicRepositoryType[];
    subject: SubjectRepositoryType[];
    sub_subject: SubSubjectRepositoryType[];
    course: CourseRepositoryType[];
    quiz: QuizRepositoryType[];
    question: QuestionRepositoryType[];
    topic_progression: TopicProgressionRepositoryType[];
  }

  private constructor() {
    this.database = {
        account: [],
        account_login: [],
        student: [],
        topic: [],
        subject: [],
        sub_subject: [],
        course: [],
        quiz: [],
        question: [],
        topic_progression: []
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
