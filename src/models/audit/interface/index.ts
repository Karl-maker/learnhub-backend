import { Base, IBaseModel } from "../../base/interface";

export interface IAuditModel extends IBaseModel<Audit>{}
export type Audit = Base & {
    account_id: string;
    action: string;
}
