import { MockDatabaseRepository } from "../../base/mock";
import { AwardRepositoryType, IAwardRepository } from "../interface";

export class AwardMockRepository extends MockDatabaseRepository<AwardRepositoryType> implements IAwardRepository {
    constructor(data: AwardRepositoryType[]) {
        super(data);
    }
}