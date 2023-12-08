import { MockDatabaseRepository } from "../../base/mock";
import { AuditRepositoryType, IAudit } from "../interface";

export class AuditMockRepository extends MockDatabaseRepository<AuditRepositoryType> implements IAudit {
    constructor(data: AuditRepositoryType[]) {
        super(data);
    }
}