import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../../src/category/category.controller';
import { CategoryService } from '../../src/category/category.service';
import { Category } from '../../src/category/category.entity';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Category()),
            create: jest.fn().mockResolvedValue(new Category()),
            update: jest.fn().mockResolvedValue(new Category()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should call CategoryService.findAll and return the result', async () => {
      const result = await categoryController.getAllCategories();
      expect(categoryService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getCategoryById', () => {
    it('should call CategoryService.findOne with correct parameters and return the result', async () => {
      const id = 'testId';
      const result = await categoryController.getCategoryById(id);
      expect(categoryService.findOne).toHaveBeenCalledWith(id);
      expect(result).toBeInstanceOf(Category);
    });
  });

  describe('createCategory', () => {
    it('should call CategoryService.create with correct parameters and return the result', async () => {
      const category = new Category();
      const result = await categoryController.createCategory(category);
      expect(categoryService.create).toHaveBeenCalledWith(category);
      expect(result).toBeInstanceOf(Category);
    });
  });

  describe('updateCategory', () => {
    it('should call CategoryService.update with correct parameters and return the result', async () => {
      const id = 'testId';
      const category = new Category();
      const result = await categoryController.updateCategory(id, category);
      expect(categoryService.update).toHaveBeenCalledWith(id, category);
      expect(result).toBeInstanceOf(Category);
    });
  });

  describe('deleteCategory', () => {
    it('should call CategoryService.remove with correct parameters', async () => {
      const id = 'testId';
      await categoryController.deleteCategory(id);
      expect(categoryService.remove).toHaveBeenCalledWith(id);
    });
  });
});
