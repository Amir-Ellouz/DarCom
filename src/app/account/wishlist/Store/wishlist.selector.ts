import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WishlistState} from "./wishlist.reducer";

const wishlistFeatureState = createFeatureSelector<WishlistState>("wishlist")

export const selectWishlist = createSelector(
wishlistFeatureState,
  (state) => state.wishlist
)
