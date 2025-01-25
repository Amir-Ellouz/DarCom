import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endpoints} from "../utils/constant";
import {Category} from "../../../../../bouhaha/src/app/core/models/base-models/categroy";

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepositoryService {

  constructor(private httpClient: HttpClient) { }


  getCategories(){
    return this.httpClient.get<Category[]>(Endpoints.categories)
  }

}
