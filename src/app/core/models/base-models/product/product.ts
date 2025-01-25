  import { Category } from '../categroy';
import { Discount } from '../discount';

export interface Product {
  id : number | null;
  name: string | null;
  price: number | null;
  itemsNumber: number | null;
  description: string | null;
  category: Category | null;
  images : string[] | null;
  discount: Discount | null;

}
