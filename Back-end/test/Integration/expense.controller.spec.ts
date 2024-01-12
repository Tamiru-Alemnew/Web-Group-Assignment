import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from '../../src/expense/expense.controller';
import { ExpenseService } from '../../src/expense/expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../../src/expense/dto/expense.dto';

describe('ExpenseController', () => {
  let expenseController: ExpenseController;
  let expenseService: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: {
            getAllExpenses: jest.fn().mockResolvedValue([]),
            getExpenseById: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Test expense' }),
            createExpense: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Test expense' }),
            updateExpense: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Updated expense' }),
            deleteExpense: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    expenseController = module.get<ExpenseController>(ExpenseController);
    expenseService = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(expenseController).toBeDefined();
  });

  describe('getAllExpenses', () => {
    it('should return an array of expenses', async () => {
      const result = [];
      jest.spyOn(expenseService, 'getAllExpenses').mockResolvedValue(result);
      expect(await expenseController.getAllExpenses()).toBe(result);
    });
  });
});
