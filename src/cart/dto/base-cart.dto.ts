// import { Types } from 'mongoose';
import { Product } from 'src/products/schmas/product.schema';
import { User } from 'src/user/schemas/user.schema';

export class BaseCartDto {
  user_id: User;
  product_id: Product;
  qty: number;
}
