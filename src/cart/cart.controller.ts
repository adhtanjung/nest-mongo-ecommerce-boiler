import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CartService } from './cart.service';
import { BaseCartDto } from './dto/base-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Post()
  async create(
    @Body('product_id') product_id: Types.ObjectId,
    @Body('user_id') user_id: Types.ObjectId,
    @Body('qty') qty: number,
  ) {
    return await this.service.create(product_id, user_id, qty);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: User) {
  //   return await this.service.findOne(id);
  // }

  @Get(':id')
  async findOne(@Param('id') id: User) {
    return await this.service.findUserCart(id);
  }
}
