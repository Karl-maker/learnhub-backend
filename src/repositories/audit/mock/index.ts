import { MockDatabaseRepository } from "../../base/mock";
import { AuditRepositoryType, IAuditRepository } from "../interface";

export class AuditMockRepository extends MockDatabaseRepository<AuditRepositoryType> implements IAuditRepository {
    constructor(data: AuditRepositoryType[]) {
        super(data);
    }
}