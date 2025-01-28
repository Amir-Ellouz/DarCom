import { Injectable } from '@angular/core';
import { ProductRepositoryService } from '../../core/repositories/product-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ProductEffects {
  constructor(
    private productsRepository: ProductRepositoryService,
    private actions$: Actions
  ) {}

  fetchProducts = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.startFetchingProducts),
        switchMap((params) => {
          return this.productsRepository.getProducts(params.params).pipe(
            map((products) => {
              return ProductActions.fetchedProducts({
                products: products,
                params: params.params,
              });
            }),
            catchError((err : HttpErrorResponse) => {
              return of(ProductActions.errorFetchingProducts({ error: err.error.message.toString() }));
            })
          );
        })
      ),
    { dispatch: true }
  );

  fetchProduct = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.startFetchingProduct),
        switchMap((params) => {
          console.log("from product effect",params.productId)
          return this.productsRepository.getProductById(params.productId).pipe(
            map((product) => {
              console.log("product",product)
              return ProductActions.fetchedProduct({ product: product });
            }),
            catchError((err : HttpErrorResponse) => {
              return of(ProductActions.errorFetchingProducts({ error: err.error.message.toString() }));
            })
          );
        })
      ),
    { dispatch: true }
  );

  // clear=createEffect(()=>
  //     this.actions$.pipe(
  //       ofType(ProductActions.clearProductError),
  //       tap(()=>{
  //         console.log("Clear Error triggered")
  //       })
  //     ),
  //   {dispatch: false}
  // )
}
