import IQuizGenerator from "../interface";
import { QuizQuestion, QuizRepositoryType } from "../../../repositories/quiz/interface";
import QuizModel from "../../../models/quiz";
import QuestionModel from "../../../models/question";

export default class BasicQuizGenerator implements IQuizGenerator {
    quizModel: QuizModel;
    questionModel: QuestionModel;

    constructor(quizModel: QuizModel, questionModel: QuestionModel) {
        this.questionModel = questionModel;
        this.quizModel = quizModel;
    }

    async generate(student_id: string, topic?: string): Promise<Partial<QuizRepositoryType>> {
        try {
            const NoQuestions = 5;
            const questions = (await this.questionModel.findMany({
                topic
            }, {
                sort: {
                    direction: 'desc',
                    field: 'tier_level'
                },
                page: {
                    size: NoQuestions,
                    number: 1
                }
            })).data;

            const quiz_questions: QuizQuestion[] = [];
            
            questions.forEach((question) => {
                quiz_questions.push({
                    question_id: question.id,
                    possible_marks: question.marks,
                    completed: false,
                    earned_marks: 0
                })
            });

            const quiz = await this.quizModel.create({
                student_id,
                questions: quiz_questions,
                type: 'generated',
                progress: true
            });

            return quiz;

        } catch(err) {
            throw err;
        }
    }
    
}