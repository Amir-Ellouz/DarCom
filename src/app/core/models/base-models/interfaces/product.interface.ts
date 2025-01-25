import { Category } from '../categroy';
import { Discount } from '../discount';

export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  itemsNumber: number;
  description: string;
  category: Category;
  images: string[];
  discount: Discount;
}

export interface GetProductInterface {
  products: ProductInterface[];
  length: number;
}


