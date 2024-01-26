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
        topic: [
          {
            id: "86cced8b-a0ad-46bd-a0c9-89b76a9a35a5",
            name: "Simplification",
            description: "",
            tier_level: 3,
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          }
        ],
        subject: [
          {
            id: "96cced8b-a0ad-46bd-a0c9-89b76a9a35a5",
            name: "Mathematics",
            description: "",
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          }
        ],
        sub_subject: [
          {
            id: "90cced8b-a0ad-46bd-a0c9-89b76a9a35a5",
            name: "O Levels Mathematics",
            subject_name: "Mathematics",
            description: "",
            course_id: ["902cced8b-a0ad-46bd-a0c9-89b76a9a35a5"],
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          }
        ],
        question: [
          {
            id: "902cced8b-a0ad-46bd-a0c9-89b76a9a35a5",
            name: "Simplify 2(3a + 5b)",
            tier_level: 2,
            marks: 1,
            content: [
              {
                type: 'text',
                text: '2(3a + 5b)'
              }
            ],
            multiple_choice: [
              {
                is_correct: false,
                content: {
                  type: 'text',
                  text: '5a + 7b'
                }
              },
              {
                is_correct: true,
                content: {
                  type: 'text',
                  text: '6a + 10b'
                }
              },
              {
                is_correct: false,
                content: {
                  type: 'text',
                  text: '16ab'
                }
              },
              {
                is_correct: false,
                content: {
                  type: 'text',
                  text: '12ab'
                }
              }
            ],
            description: "",
            topic: 'Simplification',
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          },
          {
            id: "90293d8b-a0ad-46bd-a0c9-89b76a9a35a5",
            name: "Simplification 3a + 9a",
            tier_level: 1,
            marks: 1,
            content: [
              {
                type: 'text',
                text: '3ab + 9ba'
              }
            ],
            multiple_choice: [
              {
                is_correct: true,
                content: {
                  type: 'text',
                  text: '12ab'
                }
              },
              {
                is_correct: false,
                content: {
                  type: 'text',
                  text: '3ab + 9ba'
                }
              },
              {
                is_correct: false,
                content: {
                  type: 'text',
                  text: '12a^2b^2'
                }
              },
              {
                is_correct: false,
                content: {
                  type: 'text',
                  text: '12ab'
                }
              }
            ],
            description: "",
            topic: 'Simplification',
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          },
          {
            id: "9027a0ad-46b3d-a0c9-89b76a9a35a5",
            name: "Simplify 4c + 3c",
            tier_level: 3,
            marks: 1,
            content: [
                {
                    type: 'text',
                    text: '4c + 3c'
                }
            ],
            multiple_choice: [
                {
                    is_correct: true,
                    content: {
                        type: 'text',
                        text: '7c'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '12c'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '2c'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '10c'
                    }
                }
            ],
            description: "",
            topic: 'Simplification',
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          },
          {
            id: "9027a0ad-46b3d-a1000-89b76a9a35a5",
            name: "Simplify 4q + 3q(5 + 2r)",
            tier_level: 3,
            marks: 1,
            content: [
                {
                    type: 'text',
                    text: '4q + 3q(5 + 2r)'
                }
            ],
            multiple_choice: [
                {
                    is_correct: true,
                    content: {
                        type: 'text',
                        text: '19q + 6qr'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '45q + 14qr'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '60q + 24qr'
                    }
                }
            ],
            description: "",
            topic: 'Simplification',
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          },
          {
            id: "9027a0ad-46sddq-a0c9-89b76a9a35a5",
            name: "Simplify 2q(2 - w)",
            tier_level: 4,
            marks: 1,
            content: [
                {
                    type: 'text',
                    text: '2q(3 - w)'
                }
            ],
            multiple_choice: [
                {
                    is_correct: true,
                    content: {
                        type: 'text',
                        text: '6q - 2qw'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '2q - w'
                    }
                },
                {
                    is_correct: false,
                    content: {
                        type: 'text',
                        text: '5q + 2w'
                    }
                }
            ],
            description: "",
            topic: 'Simplification',
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          },
        ],
        quiz: [],
        course: [
          {
            id: "1cced8b-a0ad-46bd-a0c9-89b76a9a35a5",
            name: "Basic Factorization",
            description: "",
            grades: [],
            topics: [{
              id: "86cced8b-a0ad-46bd-a0c9-89b76a9a35a5"
            }],
            created_at: new Date(),
            updated_at: new Date(),
            v: 1
          }
        ],
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
