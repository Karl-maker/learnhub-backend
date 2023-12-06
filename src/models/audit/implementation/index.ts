import { IDatabase } from "../../../helpers/db/interface";
import { BaseModel } from "../../base/abstract";
import { Audit, IAuditModel } from "../interface";

export class AuditModel extends BaseModel<Audit> implements IAuditModel {
    constructor(database: IDatabase) {
        super('Audit', database);
    }
}