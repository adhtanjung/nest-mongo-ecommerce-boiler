import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, Types } from 'mongoose';
import { Product } from 'src/products/schmas/product.schema';
import { User } from 'src/user/schemas/user.schema';

export type CartDocument = Cart & Document;
@Schema()
export class Cart {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: Product.name })
  product_id: Product;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: User.name })
  user_id: User;

  @Prop({ required: true })
  qty: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
