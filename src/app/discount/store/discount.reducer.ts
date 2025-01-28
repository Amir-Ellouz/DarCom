import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Discount } from 'src/app/core/models/base-models/discount';
import * as DiscountActions from './discount.actions';

export interface DiscountState {
  discounts: Discount[];

  selectedDiscount: Discount | null;

  error: string | null;

  loading?: boolean;
}

const initialDiscountsState: DiscountState = {
  error: null,
  loading: false,
  discounts: [],
  selectedDiscount: null,
};

export const discountReducer = createReducer(
  initialDiscountsState,
  on(DiscountActions.startFetchingDiscounts, (state) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(DiscountActions.fetchedDiscounts, (state, action) => {
    return {
      ...state,
      error: null,
      loading: false,
      discounts: [...state.discounts, ...action.discounts],
    };
  }),
  on(DiscountActions.errorFetchingDiscount, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(DiscountActions.clearDiscountError, (state, action) => {
    return {
      ...state,
      error: null,
    };
  })
);

const discountFeatureState = createFeatureSelector<DiscountState>('discounts');

export const getDiscounts = createSelector(
  discountFeatureState,
  (state: DiscountState) => state.discounts
);

export const getDiscountsLoading = createSelector(
  discountFeatureState,
  (state: DiscountState) => state.loading
);

export const getDiscountsError = createSelector(
  discountFeatureState,
  (state: DiscountState) => state.error
);
