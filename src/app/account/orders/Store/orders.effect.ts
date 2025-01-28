import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderRepositoryService } from 'src/app/core/repositories/order-repository.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as OrderActions from './orders.action';
import { Order } from 'src/app/core/models/base-models/order/order';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class OrdersEffects {
  constructor(
    private orderRepository: OrderRepositoryService,
    private action$: Actions
  ) {}

  fetchOrders = createEffect(
    () =>
      this.action$.pipe(
        ofType(OrderActions.startFetchingOrders),
        switchMap(() => {
          return this.orderRepository.getOrders().pipe(
            map((orders) => {
              return OrderActions.fetchedOrders({ orders: orders as Order[] });
            }),
            catchError((err) => {
              return of(OrderActions.orderError({ error: err }));
            })
          );
        })
      ),
    { dispatch: true }
  );




  makeOrder = createEffect(
    () =>
      this.action$.pipe(
        ofType(OrderActions.makeOrder),
        map((action)=>{
          const products = action.products
          return products.map(productItem => ({
            id: productItem.product!.id!,
            itemsNumber: productItem.itemsNumber
          }))
        }),
        switchMap((value) => {
          return this.orderRepository.makeOrder(value).pipe(
            map((orders) => {
              // TODO :: fix this
              return OrderActions.fetchedOrders({ orders: orders as Order[] });
            }),
            catchError((err : HttpErrorResponse) => {
              return of(OrderActions.orderError({ error: err.error.message.toString()}));
            })
          );
        })
      ),
    { dispatch: true }
  )

}
