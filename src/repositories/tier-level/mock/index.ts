import { MockDatabaseRepository } from "../../base/mock";
import { ITierLevelRepository, TierLevelRepositoryType } from "../interface";

export class TierLevelMockRepository extends MockDatabaseRepository<TierLevelRepositoryType> implements ITierLevelRepository {
    constructor(data: TierLevelRepositoryType[]) {
        super(data);
    }
}