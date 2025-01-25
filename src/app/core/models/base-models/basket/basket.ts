import { BasketProduct } from './basket-product';
import { ProductInterface } from '../interfaces/product.interface';

export interface Basket {
  id: number;

  basketProduct: BasketProduct[];
}


