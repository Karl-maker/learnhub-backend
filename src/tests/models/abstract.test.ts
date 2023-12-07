import { RepositoryDatabaseBaseType } from "../../repositories/base/interface";
import { AbstractModel } from "../../models/base/abstract";
import { MockDatabaseRepository } from "../../repositories/base/mock";

// Define the MockType
type MockType = RepositoryDatabaseBaseType & { name: string; money: number };

// Mock implementation for IRepository using MockType
class MockRepository extends MockDatabaseRepository<MockType> {
  // Implement IRepository methods as needed for testing
  constructor(data: MockType[]) {
    super(data);
  }
}

// Mock implementation for AbstractModel with MockType
class TestModel extends AbstractModel<MockType> {
  constructor() {
    super(new MockRepository([]));
  }
}

describe('AbstractModel', () => {
  let testModel: TestModel;

  beforeEach(() => {
    testModel = new TestModel();
  });

  test('create method resolves with created data', async () => {
    const newData: Partial<MockType> = { id: '1', name: 'TestName', money: 100 };
    const createdData = await testModel.create(newData);
    expect(createdData).toEqual({
      id: expect.any(String),
      name: 'TestName',
      money: 100,
      v: 1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  test('findById method resolves with found data', async () => {
    const idToFind = '1';
    const foundData = await testModel.findById(idToFind);
    expect(foundData).toEqual({
      id: idToFind,
      name: expect.any(String),
      money: expect.any(Number),
      v: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  test('findOne method resolves with found data', async () => {
    const where: Partial<MockType> = { id: '1' };
    const foundData = await testModel.findOne(where);
    expect(foundData).toEqual({
      id: '1',
      name: expect.any(String),
      money: expect.any(Number),
      v: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  test('findMany method resolves with found data and amount', async () => {
    const where: Partial<MockType> = { name: 'TestName' };
    const result = await testModel.findMany(where);
    expect(result.data).toEqual(expect.any(Array));
    expect(result.amount).toBe(expect.any(Number));
  });

  test('updateById method resolves with updated data and status', async () => {
    const idToUpdate = '1';
    const updateData: Partial<MockType> = { money: 200 };
    const result = await testModel.updateById(idToUpdate, updateData);
    expect(result.data).toEqual({
      id: idToUpdate,
      name: expect.any(String),
      money: 200,
      v: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    expect(result.status).toBe(true);
  });

  test('updateOne method resolves with updated data', async () => {
    const where: Partial<MockType> = { id: '1' };
    const updateData: Partial<MockType> = { money: 200 };
    const updatedData = await testModel.updateOne(where, updateData);
    expect(updatedData).toEqual({
      id: '1',
      name: expect.any(String),
      money: 200,
      v: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  test('updateMany method resolves with mutated count', async () => {
    const where: Partial<MockType> = { name: 'TestName' };
    const updateData: Partial<MockType> = { money: 200 };
    const result = await testModel.updateMany(where, updateData);
    expect(result.mutated).toBe(expect.any(Number));
  });

  test('deleteById method resolves with deleted data and success status', async () => {
    const idToDelete = '1';
    const result = await testModel.deleteById(idToDelete);
    expect(result.data).toEqual({
      id: idToDelete,
      name: expect.any(String),
      money: expect.any(Number),
      v: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    expect(result.successful).toBe(true);
  });

  test('deleteOne method resolves with deleted data and success status', async () => {
    const where: Partial<MockType> = { id: '1' };
    const result = await testModel.deleteOne(where);
    expect(result.data).toEqual({
      id: '1',
      name: expect.any(String),
      money: expect.any(Number),
      v: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    expect(result.successful).toBe(true);
  });

  test('deleteMany method resolves with deleted count', async () => {
    const where: Partial<MockType> = { name: 'TestName' };
    const updateData: Partial<MockType> = { money: 200 };
    const result = await testModel.deleteMany(where, updateData);
    expect(result.deleted).toBe(expect.any(Number));
  });
});
