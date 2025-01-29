import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Endpoints} from "../utils/constant";
import { Product } from '../models/base-models/product/product';
import { User } from '../models/base-models/user';

@Injectable({
  providedIn: 'root'
})
export class BasketRepositoryService {

  constructor(private httpClient: HttpClient) { }


  addToBasket(productId: number,itemsNumber : number){
    return this.httpClient.post<{product : Product}>(
      Endpoints.addToBasket,
      {
        id : productId,
        itemsNumber : itemsNumber
        }
      )
  }


  removeFromBasket(productId : number){
    return this.httpClient.delete(Endpoints.deleteFromBasket(productId))
  }

  //added by roua
  getBasket(user : User){
    return this.httpClient.get<{user : User}>(
      Endpoints.basket,

    )
  }


}
