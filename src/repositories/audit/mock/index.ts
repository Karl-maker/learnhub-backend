import { AuditRepositoryType, IAudit } from "..";
import { MockDatabaseRepository } from "../../base/mock";

export class AuditMockRepository extends MockDatabaseRepository<AuditRepositoryType> implements IAudit {
    constructor(data: AuditRepositoryType[]) {
        super(data);
    }
}