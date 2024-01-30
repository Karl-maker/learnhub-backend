import { QuizRepositoryType } from "../../../repositories/quiz/interface"
 
export default interface IQuizGenerator {
    generate(student_id: string, topic?: string, no_of_questions?: number, difficulty?: number, range?: number): Promise<QuizRepositoryType>;
}