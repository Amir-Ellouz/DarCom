import {Product} from "../../core/models/base-models/product/product";
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as ProductActions from "./product.actions"

export interface ProductState {

  products : Product[]

  selectedProduct : Product | null

  error : string | null

  loading : boolean
}


const initialProductsState : ProductState = {
  error : null,
  loading: false,
  products : [],
  selectedProduct : null,
}

export const productReducer = createReducer(
  initialProductsState,
  on(
    ProductActions.startFetchingProducts,
    (state)=>{
      return {
        ...state,
        error : null,
        loading : true
      }
    }
    ),
  on(
    ProductActions.fetchedProducts,
    (state,action)=>{
      const {category} = action.params
      if (category){
        return {
          ...state,
          error : null,
          loading : false,
          products : [...state.products,...action.products]
        }
      }else if(!category){
        return {
          ...state,
          error : null,
          loading : false,
          products : [...state.products,...action.products]
        }
      }else{
        return {
          ...state,
          error : null,
          loading : false,
          products : action.products
        }
      }
    }
  ),
  on(
    ProductActions.startFetchingProduct,
    (state,action)=>{
      return {
        ...state,
        error : null,
        loading : true,
      }
    }
  ),
  on(
    ProductActions.fetchedProduct,
    (state,action)=>{
      return {
        ...state,
        error : null,
        loading : false,
        selectedProduct : action.product
      }
    }
  ),
  on(
    ProductActions.errorFetchingProducts,
    (state,action)=>{
      return {
        ...state,
        selectedProduct : null,
        error : action.error,
        loading : false,
      }
    }
  ),
  on(
    ProductActions.clearProductError,
    (state,action)=>{
      return {
        ...state,
        error : null,
      }
    }
  ),
)



const productFeatureState = createFeatureSelector<ProductState>("products")


export const getProducts = createSelector(
  productFeatureState,
  (state : ProductState)=>state.products
)


export const getProductsLoading = createSelector(
  productFeatureState,
  (state : ProductState)=>state.loading
)


export const getProductsError = createSelector(
  productFeatureState,
  (state : ProductState)=>state.error
)


export const getSelectedProduct=createSelector(
  productFeatureState,
  (state)=>state.selectedProduct
)
