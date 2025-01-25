import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '../utils/constant';
import { Product } from '../../../../../bouhaha/src/app/core/models/base-models/product/product';
import { GetProductsParams } from '../../../../../bouhaha/src/app/core/models/dto/get-products-params';
import {map} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  constructor(private httpClient: HttpClient) {}

  getProducts(params: GetProductsParams) {
    let httpParams = new HttpParams();
    if (params.category) {
      httpParams = httpParams.append('category', params.category);
    }
    if (params.page) {
      httpParams = httpParams.append('page', params.page);
    }
    return this.httpClient.get<{products : Product[]}>(Endpoints.products, {
      params: httpParams,
    }).pipe(
      map(value => {
        return value.products
      })
    );
  }

  getProductById(id: number) {
    return this.httpClient.get<Product>(Endpoints.productById(id));
  }
}
