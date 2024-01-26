import IQuizGenerator from "../interface";
import { IQuizRepository, QuizQuestion, QuizRepositoryType } from "../../../repositories/quiz/interface";
import QuizModel from "../../../models/quiz";
import QuestionModel from "../../../models/question";
import { IQuestionRepository, QuestionRepositoryType } from "../../../repositories/question/interface";
import QuizRepository from "../../../repositories/quiz";
import logger from "../../../helpers/logger";

export default class BasicQuizGenerator implements IQuizGenerator {
    quizRepository: IQuizRepository;
    questionRepository: IQuestionRepository;

    constructor(quizRepository: IQuizRepository, questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }

    async generate(student_id: string, topic?: string, no_of_questions: number = 5, difficulty: number = 1, range = 5): Promise<Partial<QuizRepositoryType>> {
        try {
            
            const where: Partial<QuizRepositoryType> | {} = {};
            if(topic) where['topic'] = topic;
            const questions = await this.questionRepository.findByTierLevel(where, {
                amount: no_of_questions,
                tier_level: difficulty,
                range
            });

            const quiz_questions_randomizer: Partial<QuestionRepositoryType>[] = this.getRandomQuestions(questions, no_of_questions, difficulty, range);
            const quiz_questions: QuizQuestion[] = [];
            
            quiz_questions_randomizer.forEach((question) => {
                quiz_questions.push({
                    id: question.id,
                    possible_marks: question.marks,
                    completed: false,
                    earned_marks: 0,
                    tier_level: question.tier_level
                })
            });

            const quiz = await this.quizRepository.create({
                student_id,
                questions: quiz_questions,
                type: 'generated',
                complete: false
            });

            return quiz;

        } catch(err) {
            throw err;
        }
    }
    
    getRandomQuestions(questions: Partial<QuestionRepositoryType>[], x: number, difficulty: number, range: number = 3): Partial<QuestionRepositoryType>[] {
        if(questions.length < 1) return [];
        if (x >= questions.length) {
            // If x is greater than or equal to the number of questions, repeat questions as needed
            const repeatedQuestions = [];
            for (let i = 0; i < x; i++) {
                repeatedQuestions.push(questions[i % questions.length]);
            }
            return repeatedQuestions;
        }
    
        // Filter questions based on difficulty
        const filteredQuestions = questions.filter(question => Math.abs(question.tier_level - difficulty) <= range);
    
        // Randomize the filtered array
        const randomizedQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5);
    
        // Select the first x questions
        const selectedQuestions = randomizedQuestions.slice(0, x);
    
        return selectedQuestions;
    }
    
}