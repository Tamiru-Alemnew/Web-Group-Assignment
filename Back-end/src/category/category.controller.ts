import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategoryDto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: any) {
    return this.categoryService.findOne(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }


  @Put(':id')
  updateCategory(@Param('id') id: any, @Body() category: Category) {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: any) {
    return this.categoryService.remove(id);
  }
}
