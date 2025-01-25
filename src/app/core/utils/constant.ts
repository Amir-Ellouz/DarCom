
export const baseUrl ="http://localhost:3000"


export class Endpoints{



  // Products Endpoints
  static products =`${baseUrl}/product`;

  static productById(id: number) :string {
    return `${baseUrl}/product/${id}`
  }



  //Orders Endpoints

  static orders = `${baseUrl}/order`

  static makeOrder = `${baseUrl}/order/make`



  //Discounts Endpoints

  static discounts=`${baseUrl}/discount`

  //Categories Endpoints

  static categories = `${baseUrl}/category`



  //Basket Endpoints

  static basket = `${baseUrl}/basket`

  static addToBasket=`${baseUrl}/basket/add`

  static deleteFromBasket(id:number){
    return `${baseUrl}/basket/delete/${id}`
  }



  //User Endpoints
  static login=`${baseUrl}/user/login`

  static signUp=`${baseUrl}/user/signup`

  static updateProfile=`${baseUrl}/user/update`

  static verifyAccount=`${baseUrl}/user/verify`


}



