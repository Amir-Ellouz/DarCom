import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {WishlistState} from "./wishlist.reducer";
import {addToWishlist, loadWishlist, removeFromWishlist, wishlistLoaded} from "./wishlist.actions";
import {map, tap, withLatestFrom} from "rxjs";
import {Product} from "../../../core/models/base-models/product/product";
import {selectWishlist} from "./wishlist.selector";


@Injectable()
export class wishlistEffects{


  constructor(private actions : Actions,private store : Store<WishlistState>) {
  }

  loadWishlist = createEffect(
    ()=>{
      return this.actions.pipe(
        ofType(loadWishlist),
        map(
          ()=>{
            const wishlistSer = localStorage.getItem("wishlist")
            const wishlist : Product[] = wishlistSer ? JSON.parse(wishlistSer) : []
            return wishlistLoaded({products : wishlist})
          }
        )
      )
    }
  )

  updateWishlist=createEffect(
    ()=>{
      return this.actions.pipe(
        ofType(addToWishlist,removeFromWishlist),
        withLatestFrom(this.store.select(selectWishlist)),
        tap(
          ([_,value])=>{
            localStorage.setItem("wishlist",JSON.stringify(value))
          }
        )
      )
    },{dispatch : false}
  )




}
