import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as CartActions from "./cart.actions"
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {BasketRepositoryService} from "../../core/repositories/basket-repository.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BasketState, getBasket} from "./cart.reducer";
import {Store} from "@ngrx/store";
import {Basket} from "../../core/models/base-models/basket/basket";
import {BasketProduct} from "../../core/models/base-models/basket/basket-product";


@Injectable()
export class CartEffects{



  constructor(
    private actions$ : Actions,private cartRepository : BasketRepositoryService,
    private store : Store<BasketState>) {
  }


  addToBasket = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CartActions.startAddToBasket),
      switchMap((action)=>{
        return this.cartRepository.addToBasket(action.productId.id!,action.itemsNumber).pipe(
          map(()=>{
            return CartActions.addToBasketSuccess({product : action.productId , itemsNumber : action.itemsNumber})
          }),
          catchError(
            (er : HttpErrorResponse)=>{
              return of(CartActions.basketError({error : er.error.message.toString()}))
            }
          )
        )
      })
    )
  },{dispatch : true})


  removeFromBasket = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CartActions.removeFromBasketStart),
      switchMap((action)=>{
        return this.cartRepository.removeFromBasket(action.productId).pipe(
          map((value)=>{
            return CartActions.removeFromBasketSuccess({productId : action.productId})
          }),
          catchError(
            (er : HttpErrorResponse)=>{
              return of(CartActions.basketError({error : er.error.message.toString()}))
            }
          )
        )
      })
    )
  },{dispatch : true})


  storeBasketToLocalStorage = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CartActions.setBasket),
      tap(value => {
        localStorage.setItem("basket",JSON.stringify(value.basket))
      })
    )
  },{dispatch : false})


  updateBasketSuccess = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CartActions.removeFromBasketSuccess,CartActions.addToBasketSuccess),
      withLatestFrom(this.store.select(getBasket)),
      tap(([_,value]) => {
        const preBasketSerialized = localStorage.getItem("basket")
        const prevBasket : Basket= JSON.parse(preBasketSerialized!)
        const newProducts : BasketProduct[]= value.map(
          (elem)=>{
            return{
              itemsNumber : elem.itemsNumber,
              product : elem.product
            }
          }
        )
        const newBasket : Basket = {
          id : prevBasket.id,
          basketProduct : newProducts
        }
        localStorage.setItem("basket",JSON.stringify(newBasket))
      })
    )
  },{dispatch : false})

}
