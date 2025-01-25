import { Product } from './product/product';
import { ProductInterface } from './interfaces/product.interface';

export class Discount {
  id?: number;

  startDate?: Date;

  endDate?: Date;

  value?: number;

  product!: Product;
}

export interface DiscountInterface {
  id: number;

  startDate: Date;

  endDate: Date;

  value: number;

  product: ProductInterface;
}
