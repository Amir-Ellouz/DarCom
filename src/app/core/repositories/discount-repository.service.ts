import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '../utils/constant';
import { Discount } from '../../../../../bouhaha/src/app/core/models/base-models/discount';
import { GetDiscountParams } from '../../../../../bouhaha/src/app/core/models/dto/get-discount-params';

@Injectable({
  providedIn: 'root',
})
export class DiscountRepositoryService {
  constructor(private httpClient: HttpClient) {}

  getDiscounts(params: GetDiscountParams) {
    let httpParams = new HttpParams();

    if (params.page) {
      httpParams = httpParams.append('page', params.page);
    }
    return this.httpClient.get<Discount[]>(Endpoints.discounts, {
      params: httpParams,
    });
  }
}
