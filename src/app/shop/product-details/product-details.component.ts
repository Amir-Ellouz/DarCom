import {Component, OnDestroy} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Product} from "../../core/models/base-models/product/product";
import {Store} from "@ngrx/store";
import {getProductsError, getProductsLoading, getSelectedProduct, ProductState} from "../store/product.reducer";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import * as ProductsAction from "../store/product.actions"
import {GenericComponent} from "../../shared/generic/generic.component";
import {clearProductError} from "../store/product.actions";
import {addToWishlist} from "../../account/wishlist/Store/wishlist.actions";
import {startAddToBasket} from "../../cart/store/cart.actions";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: false,
})
export class ProductDetailsComponent extends GenericComponent implements OnDestroy{


  product$ : Observable<Product | null>
  loading$ : Observable<boolean>
  product! : Product
  itemsNumber : number =1;

  constructor(private store : Store<ProductState>,private activatedRoute : ActivatedRoute,private dialog : MatDialog){
    super(store.select(getProductsError),store,dialog,clearProductError)
    this.activatedRoute.params.subscribe(
      (params)=>{
        console.log(params)
        this.store.dispatch(ProductsAction.startFetchingProduct({productId : +params["id"]}))
      }
    )
    this.product$=this.store.select(getSelectedProduct).pipe(
      tap((pr)=>{
        this.product=pr!
      })
    )
    this.loading$ = this.store.select(getProductsLoading)
  }

  ngOnDestroy(): void {
    this.destroySubscription()
  }


  addToWishlist(){
    this.store.dispatch(addToWishlist({product : this.product}))
  }

  addToCart() {
    this.store.dispatch(startAddToBasket({productId : this.product, itemsNumber : 1}))
  }

  handleEvent($event: number) {
    this.itemsNumber=$event
  }
}
