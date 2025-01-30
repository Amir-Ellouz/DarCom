import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Endpoints} from "../utils/constant";
import { Product } from '../models/base-models/product/product';
import { User } from '../models/base-models/user';

@Injectable({
  providedIn: 'root'
})
export class BasketRepositoryService {
  
  constructor(private httpClient: HttpClient) {
  }


  addToBasket(productId: number,itemsNumber : number){
    const token = localStorage.getItem('token'); // Fetch the latest token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post<{ product: Product }>(
      Endpoints.addToBasket,
      { id: productId, itemsNumber },
      { headers }
    );
  }


  removeFromBasket(productId : number){
    return this.httpClient.delete(Endpoints.deleteFromBasket(productId))
  }

  getBasket(user : User){
    return this.httpClient.get<{user : User}>(
      Endpoints.basket,

    )
  }


}
