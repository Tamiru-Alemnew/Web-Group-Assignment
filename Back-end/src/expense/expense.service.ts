import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entity/expense.entity'; // Assuming you have an Expense entity
import { CreateExpenseDto, UpdateExpenseDto } from './dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  getAllExpenses() {
    return this.expenseRepository.find();
  }

  getExpenseById(id: string) {
    return this.expenseRepository.findOne(id);
  }

  createExpense(createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepository.create(createExpenseDto);
    return this.expenseRepository.save(expense);
  }

  async updateExpense(id: string, updateExpenseDto: UpdateExpenseDto) {
    await this.expenseRepository.update(id, updateExpenseDto);
    return this.expenseRepository.findOne(id);
  }

  deleteExpense(id: string) {
    return this.expenseRepository.delete(id);
  }
}
