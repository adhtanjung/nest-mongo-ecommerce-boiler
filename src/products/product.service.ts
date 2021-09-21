import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseProductDto } from './dto/base-product.dto';
import { Product, ProductDocument } from './schmas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.model.find().exec();
  }

  async create(create: BaseProductDto): Promise<Product> {
    return await new this.model({
      ...create,
      updatedAt: new Date(),
      createdAt: new Date(),
    }).save();
  }

  async findFilter(price: number): Promise<Product[]> {
    const res = await this.model
      .find({
        price: { $gte: price },
      })
      .sort({ price: -1 })
      .exec();
    return res;
  }
}
