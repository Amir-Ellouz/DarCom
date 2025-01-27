import {createAction, props} from "@ngrx/store";
import {Product} from "../../../../core/models/base-models/product/product";


const RECOMMENDATIONS_FETCHING_START = "[RECOMMENDATIONS] RECOMMENDATIONS_FETCHING_START"


const RECOMMENDATIONS_FETCHING_SUCCESS = "[RECOMMENDATIONS] RECOMMENDATIONS_FETCHING_SUCCESS"

const RECOMMENDATIONS_FETCHING_FAILURE="[RECOMMENDATIONS] RECOMMENDATIONS_FETCHING_FAILURE"

const CLEAR_RECOMMENDATION_ERROR = "[RECOMMENDATIONS] CLEAR_RECOMMENDATION_ERROR"


export const recommendationStartFetching=createAction(
  RECOMMENDATIONS_FETCHING_START,
  props<{category : string}>()
)

export const recommendationsFetchedSuccess=createAction(
  RECOMMENDATIONS_FETCHING_SUCCESS,
  props<{products : Product[]}>()
)


export const recommendationsError=createAction(
  RECOMMENDATIONS_FETCHING_FAILURE,
  props<{error : string}>()
)



export const clearRecommendationError=createAction(
  CLEAR_RECOMMENDATION_ERROR,
  props<{error : string}>()
)


