import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { BaseProductDto } from './dto/base-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() create: BaseProductDto) {
    try {
      const res = await this.service.create(create);
      return res;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('filtered')
  async findFiltered(@Query('price') price: number) {
    return await this.service.findFilter(price);
  }
}
