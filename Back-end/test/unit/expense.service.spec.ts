import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from '../../src/expense/expense.service';
import { Repository } from 'typeorm';
import { Expense } from '../../src/expense/entity/expense.entity';
import { User } from '../../src/auth/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let expenseRepository: Repository<Expense>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: getRepositoryToken(Expense), useClass: Repository },
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    expenseRepository = module.get<Repository<Expense>>(
      getRepositoryToken(Expense),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
