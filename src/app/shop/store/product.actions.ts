import {createAction, props} from "@ngrx/store";
import {Product} from "../../core/models/base-models/product/product";
import {GetProductsParams} from "../../core/models/dto/get-products-params";

export const START_FETCHING_PRODUCTS = "[PRODUCTS] START_FETCHING_PRODUCTS"
export const FETCHED_PRODUCTS = "[PRODUCTS] FETCHED_PRODUCTS"

export const PRODUCTS_ERROR = "[PRODUCTS] PRODUCTS ERROR"

export const START_FETCHING_PRODUCT = "[PRODUCTS] START_FETCHING_PRODUCT"

export const FETCHED_PRODUCT = "[PRODUCTS] FETCHED_PRODUCT"

export const CLEAR_PRODUCT_ERROR = "[PRODUCTS] CLEAR_PRODUCT_ERROR"



export const startFetchingProducts = createAction(
  START_FETCHING_PRODUCTS,
  props<{params : GetProductsParams}>()
)

export const fetchedProducts=createAction(
  FETCHED_PRODUCTS,
  props<{products: Product[],params : GetProductsParams}>()
)

export const errorFetchingProducts=createAction(
  PRODUCTS_ERROR,
  props<{error : string}>()
)


export const fetchedProduct=createAction(
  FETCHED_PRODUCT,
  props<{product : Product}>()
)

export const startFetchingProduct=createAction(
  START_FETCHING_PRODUCT,
  props<{productId : number}>()
)

export const clearProductError=createAction(CLEAR_PRODUCT_ERROR)
