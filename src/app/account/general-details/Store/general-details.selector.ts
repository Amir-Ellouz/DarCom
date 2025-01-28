import {AccountState} from "./general-details.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

const userFeatureState = createFeatureSelector<AccountState>("user")

export const selectUser = createSelector(
  userFeatureState ,
  (state) => state.user
)

export const getUserError = createSelector(
  userFeatureState,
  (state)=>state.error
)

export const getLoadingState = createSelector(
  userFeatureState,
  (state)=>state.loading
)

export const getFullName = createSelector(
  userFeatureState,
  (state)=>state.user?.firstName +" "+ state.user?.lastName
)
