import {Product} from "../../../../core/models/base-models/product/product";
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {
  clearRecommendationError,
  recommendationsError,
  recommendationsFetchedSuccess,
  recommendationStartFetching
} from "./recommedations.action";
import {state} from "@angular/animations";
import {act} from "@ngrx/effects";
import {ProductState} from "../../../store/product.reducer";


export interface RecommendationsState{
  products : Product[]
  error : string | null
  loading : boolean
  category : string | null

}




export const initialState : RecommendationsState={
  error: null,
  loading: false,
  products: [],
  category : null
}


export const recommendationsReducer=createReducer(
  initialState,
  on(recommendationStartFetching,
    (state,action)=>{
    return {
      ...state,
      error : null,
      loading : true,
      category : action.category
    }
  }),
  on(recommendationsFetchedSuccess,(state,action)=>{
    console.log(action.products)
    return{
      ...state ,
      loading : false,
      products : [...action.products]
    }
  }),
  on(recommendationsError,(state,action)=>{
    return{
      ...state,
      loading : false,
      error : action.error,
      category: null
    }
  }),
  on(clearRecommendationError,(state,action)=>{
    return{
      ...state,
      error : null,
    }
  }),
)


const recommendationsFeatureSelector = createFeatureSelector<RecommendationsState>("recommendations")


export const getRecommendations = createSelector(
  recommendationsFeatureSelector,
  (state : RecommendationsState)=>state.products
)


export const getRecommendationsLoading = createSelector(
  recommendationsFeatureSelector,
  (state : RecommendationsState)=>state.loading
)


export const getRecommendationsError = createSelector(
  recommendationsFeatureSelector,
  (state : RecommendationsState)=>state.error
)















