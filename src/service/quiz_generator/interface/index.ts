import { QuizRepositoryType } from "../../../repositories/quiz/interface"
 
export default interface IQuizGenerator {
    generate(student_id: string, topic?: string): Promise<Partial<QuizRepositoryType>>;
}