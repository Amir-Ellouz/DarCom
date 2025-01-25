import {Basket} from "../base-models/basket/basket";

export interface SignInSuccessDto{


  firstName : string ,

  lastName : string,

  email: string,

  phoneNumber: string,

  address : string,

  basket : Basket

  token : string

}
