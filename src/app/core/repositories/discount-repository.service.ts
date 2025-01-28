import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '../utils/constant';
import { GetDiscountParams } from '../models/dto/get-discount-params';
import { Discount } from '../models/base-models/discount';


@Injectable({
  providedIn: 'root',
})
export class DiscountRepositoryService {
  constructor(private httpClient: HttpClient) {}

  getDiscounts(params: GetDiscountParams) {
    let httpParams = new HttpParams();
    return this.httpClient.get<Discount[]>(Endpoints.discounts, {
      params: httpParams,
    });
  }
}
