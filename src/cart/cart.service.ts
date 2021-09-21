import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BaseCartDto } from './dto/base-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';

import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { BaseProductDto } from 'src/products/dto/base-product.dto';
import { BaseUserDto } from 'src/user/dto/base-user.dto';
import { User } from 'src/user/schemas/user.schema';
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly model: Model<CartDocument>,
  ) {}

  async findAll(): Promise<any> {
    return await this.model.find().populate('product_id').exec();
  }

  async create(
    product: Types.ObjectId,
    user: Types.ObjectId,
    qty: number,
  ): Promise<BaseCartDto> {
    const res = await new this.model({
      product_id: product,
      user_id: user,
      qty,
    }).save();
    return res;
  }

  async findOne(id: User): Promise<BaseCartDto> {
    return await this.model
      .findOne({ user_id: id })
      .populate('product_id')
      .exec();
  }

  async findUserCart(id: User): Promise<BaseCartDto[]> {
    return await this.model.find({ user_id: id }).populate('product_id').exec();
  }
}
