import { IAuditModel } from "../../src/models/audit/interface";
import { AuditModel } from "../../src/models/audit/implementation";
import { MockDatabaseClient } from "../../src/helpers/db/mock";

const database = new MockDatabaseClient();
const auditModel: IAuditModel = new AuditModel(database);

// Jest test suite
describe("Audit Model", () => {
  it("should create an audit entry", async () => {
    const newAuditEntry = await auditModel.create({
      account_id: "testAccountId",
      action: "testAction",
    });

    expect(newAuditEntry.data).toMatchObject({
      account_id: "testAccountId",
      action: "testAction",
      v: 1, 
    });
  });

  it("should find audit entries", async () => {
    const accountId = "testAccountId";
    const foundAuditEntries = await auditModel.find({
      account_id: accountId,
    });

    expect(foundAuditEntries.amount).toBeGreaterThanOrEqual(0);
  });

  it("should update an audit entry", async () => {
    const accountId = "testAccountId";
    const initialAuditEntry = await auditModel.create({
      account_id: accountId,
      action: "initialAction",
    });

    const updatedAuditEntry = await auditModel.update(
      { id: initialAuditEntry.data.id, account_id: accountId },
      { action: "updatedAction" }
    );

    expect(updatedAuditEntry.mutated).toBe(1);
  });

  it("should delete an audit entry", async () => {
    const accountId = "testAccountId";
    const initialAuditEntry = await auditModel.create({
      account_id: accountId,
      action: "actionToDelete",
    });

    const deletedAuditEntry = await auditModel.delete({
      id: initialAuditEntry.data.id,
      account_id: accountId,
    });

    expect(deletedAuditEntry.deleted).toBe(1);
  });
});
