import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../src/category/category.service';
import { Repository } from 'typeorm';
import { Category } from '../../src/category/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getRepositoryToken(Category), useClass: Repository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all categories', async () => {
    const categories: Category[] = [{ id: 1, name: 'Test' }];
    categoryRepository.find = jest.fn().mockResolvedValue(categories);

    const result = await service.findAll();

    expect(result).toEqual(categories);
  });

  it('should find one category', async () => {
    const category: Category = { id: 1, name: 'Test' };
    categoryRepository.findOne = jest.fn().mockResolvedValue(category);

    const result = await service.findOne(1);

    expect(result).toEqual(category);
  });

});
