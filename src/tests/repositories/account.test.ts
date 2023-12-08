import AccountRepository from "../../repositories/account";
import { AccountRepositoryType } from "../../repositories/account/interface";
import { IAccountRepository } from "../../repositories/account/interface";
import { AccountMockRepository } from "../../repositories/account/mock";

describe('AccountMockRepository', () => {
  // Mock data for testing

  let mockAccounts: AccountRepositoryType[];
  let accountMockRepository: IAccountRepository;

  beforeEach(() => {
    mockAccounts = [
      {
        id: '1',
        v: 1,
        created_at: new Date(),
        updated_at: new Date(),
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        hash_password: 'hashedPassword',
        type: 'student',
      },
      // Add more mock data as needed
    ];

    accountMockRepository = new AccountRepository.mock(mockAccounts);
  });

  afterEach(() => {
    // Optionally, reset or clean up resources after each test
  });

  test('find method returns correct data', async () => {
    const result = await accountMockRepository.find({ email: 'john.doe@example.com' });
    expect(result.data.length).toBe(1);
    expect(result.data[0].first_name).toBe('John');
  });

  test('create method adds a new account', async () => {
    const newData: Partial<AccountRepositoryType> = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      hash_password: 'hashedPassword',
      type: 'student',
    };

    const createdAccount = await accountMockRepository.create(newData);
    expect(createdAccount.id).toBeDefined();
    expect(createdAccount.first_name).toBe('Jane');
  });

  test('update method modifies existing account', async () => {
    const updateData: Partial<AccountRepositoryType> = {
      first_name: 'UpdatedName',
    };

    const updateResult = await accountMockRepository.update({ email: 'john.doe@example.com' }, updateData);
    expect(updateResult.mutated).toBe(1);

    const updatedAccount = mockAccounts.find((account) => account.email === 'john.doe@example.com');
    expect(updatedAccount?.first_name).toBe('UpdatedName');
  });

  test('delete method removes existing account', async () => {
    const deleteResult = await accountMockRepository.delete({ email: 'john.doe@example.com' });
    expect(deleteResult.deleted).toBe(1);

    const deletedAccount = mockAccounts.find((account) => account.first_name === 'John');
    expect(deletedAccount).toBeUndefined();
  });
});
