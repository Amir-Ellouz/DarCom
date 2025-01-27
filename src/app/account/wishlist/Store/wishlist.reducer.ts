import {Product} from "../../../core/models/base-models/product/product";
import {createReducer, on} from "@ngrx/store";
import {addToWishlist, removeFromWishlist, wishlistLoaded} from "./wishlist.actions";


export interface WishlistState {
  wishlist : Product[]

}

const initialState : WishlistState = {
  wishlist: [
  ]
}


export const wishlistReducer = createReducer<WishlistState>(
  initialState,
  on(wishlistLoaded,(state,action)=>{
    return {
      wishlist : action.products
    }
  }),
  on(addToWishlist, (state, action): WishlistState => {
    const productId = action.product.id;
    const isProductInWishlist = state.wishlist.some((product) => product.id === productId);
    console.log(state)
    if (isProductInWishlist) {
      console.log("entered");
      return state;
    } else {
      console.log("else entered");
      return {
        ...state,
        wishlist: [...state.wishlist,action.product]
      };
    }
  }),
  on(removeFromWishlist,(state,action)=>{
    const prevState = [...state.wishlist]
    const newState = prevState.filter(
      (ele)=>ele.id!=action.id
    )
    return {
      wishlist : newState
    }
  })
)



