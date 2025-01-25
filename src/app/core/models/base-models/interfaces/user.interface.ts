import { Basket } from '../basket/basket';

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  basket: Basket;
  token: string;
}
