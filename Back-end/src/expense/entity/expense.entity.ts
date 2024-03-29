import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Category } from '../../category/category.entity';
@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Column()
  category: string;
}
