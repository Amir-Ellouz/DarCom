import {Component, OnDestroy} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Product} from "../core/models/base-models/product/product";
import {Store} from "@ngrx/store";
import {getProducts, getProductsError, getProductsLoading, ProductState} from "./store/product.reducer";
import * as ProductsActions from "./store/product.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GenericComponent} from "../shared/generic/generic.component";
import {clearProductError} from "./store/product.actions";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: false,
})
export class ShopComponent extends GenericComponent implements OnDestroy{

  products$ : Observable<Product[]>
  loading$ : Observable<boolean>

  constructor(private store : Store<ProductState>,private activatedRoute : ActivatedRoute,private dialog: MatDialog,private router : Router) {
    super(store.select(getProductsError),store,dialog,clearProductError)
    this.activatedRoute.queryParams.pipe(
      tap((params)=>{
        this.store.dispatch(ProductsActions.startFetchingProducts({params : {page : +params["page"], category : params["category"]}}))
      })
    ).subscribe()
    this.loading$ = this.store.select(getProductsLoading)
    this.products$ = this.store.select(getProducts)

  }

  ngOnDestroy(): void {
    this.destroySubscription()
  }


  navigateToCategory(category : string | null){
    this.router.navigate([],{
      queryParams : {
        category : category,
        page : 1
      }
    })
  }

  addPage(){
    const page = this.activatedRoute.snapshot.queryParams["page"]
    const category = this.activatedRoute.snapshot.queryParams["category"]
    this.router.navigate([],{
      queryParams : {
        category : category,
        page : +page + 1
      }
    })
  }


}
