import { MockDatabaseRepository } from "../../base/mock";
import { IQuestionRepository, QuestionRepositoryType } from "../interface";

export class QuestionMockRepository extends MockDatabaseRepository<QuestionRepositoryType> implements IQuestionRepository {
    constructor(data: QuestionRepositoryType[]) {
        super(data);
    }
    async findByDifficulty(where: Partial<QuestionRepositoryType>, options: {
        amount: number,
        tier_level: number,
        range: number
    }): Promise<QuestionRepositoryType[]> {
        return new Promise((resolve, reject) => {
            try {
                const filteredQuestions = this.data.filter(question =>
                    this.matchesWhereConditions(question, where) && ((-1 * (question.tier_level - options.tier_level)) <= options.range)
                );

                // If the amount requested is greater than the available questions, repeat the filtered questions
                const repeatedQuestions = [];
                while (repeatedQuestions.length < options.amount && filteredQuestions.length > 0) {
                    repeatedQuestions.push(filteredQuestions.shift()!); // shift removes and returns the first element
                }

                resolve(repeatedQuestions);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Helper function to check if a question matches the 'where' conditions
    private matchesWhereConditions(question: QuestionRepositoryType, where: Partial<QuestionRepositoryType>): boolean {
        return Object.entries(where).every(([key, value]) => question[key] === value);
    }
}
    
