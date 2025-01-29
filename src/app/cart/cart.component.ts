import { Component } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {BasketState, getBasketError, getBasketLoading, getBasketProducts} from "./store/cart.reducer";
import {Store} from "@ngrx/store";
import {clearError, removeFromBasketStart} from "./store/cart.actions";
import {Product} from "../core/models/base-models/product/product";
import {GenericComponent} from "../shared/generic/generic.component";
import {MatDialog} from "@angular/material/dialog";
import {selectOrdersLoading} from "../account/orders/Store/orders.reducer";
import {makeOrder} from "../account/orders/Store/orders.action";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent extends GenericComponent{
  currentTab: string = 'Tab1';
  selectedShipping: string = 'Free shipping';
  expressShippingCost: number = 15.00;
  currentDate: string | null;


  basketProducts!: {
    product : Product
    itemsNumber : number
  }[]
  loading$ : Observable<boolean>
  orderLoading$ : Observable<boolean>

  constructor(private store: Store< BasketState >,private dialog: MatDialog,private datePipe:DatePipe) {
    super(store.select(getBasketError),store,dialog,clearError)
    this.loading$=this.store.select(getBasketLoading);
    this.orderLoading$=this.store.select(selectOrdersLoading);
    this.store.select(getBasketProducts).subscribe(
      (value => {
          this.basketProducts=value
      })
    );
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'MMMM dd, yyyy');
  }

  openTab(tabName: string) {
    this.currentTab = tabName;
  }

  removeProduct(productId: number) {
    this.store.dispatch(removeFromBasketStart({ productId }));
  }

  addOrder(){
    this.store.dispatch(makeOrder({products :this.basketProducts}));
  }
}
