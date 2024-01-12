import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entity/expense.entity'; 
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { User } from 'src/auth/entities/user.entity';
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllExpenses() {
    return this.expenseRepository.find();
  }

  getExpenseById(id: any) {
    return this.expenseRepository.findOne(id);
  }

  async createExpense(createExpenseDto: CreateExpenseDto) {
    const user = await this.userRepository.findOne({
      where: { id: createExpenseDto.userId },
    });
    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      user,
    });
    return this.expenseRepository.save(expense);
  }

  async updateExpense(id: any, updateExpenseDto: UpdateExpenseDto) {
    await this.expenseRepository.update(id, updateExpenseDto);
    return this.expenseRepository.findOne(id);
  }

  deleteExpense(id: any) {
    return this.expenseRepository.delete(id);
  }
}
