import {createAction, props} from "@ngrx/store";
import {Product} from "../../../core/models/base-models/product/product";


const LOAD_WISHLIST = "[WISHLIST] LOAD_WISHLIST"

const WISHLIST_LOADED = "[WISHLIST] WISHLIST_LOADED"


const ADD_TO_WISHLIST = "[[WISHLIST]] ADD_TO_WISHLIST"

const REMOVE_FROM_WISHLIST = "[[WISHLIST]] REMOVE_FROM_WISHLIST"


export const loadWishlist =createAction(
  LOAD_WISHLIST,
)


export const addToWishlist=createAction(
  ADD_TO_WISHLIST,
  props<{product : Product}>()
)


export const removeFromWishlist = createAction(
  REMOVE_FROM_WISHLIST,
  props<{id : number}>()
)

export const wishlistLoaded = createAction(
  WISHLIST_LOADED,
  props<{products : Product[]}>()
)




