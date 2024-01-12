import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateExpenseDto {

  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsNumber()
  userId: number;

  @IsNumber()
  categoryId: number;
}

export class UpdateExpenseDto {

  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsNumber()
  childId: number;

  @IsString()
  categoryId: number;
}
