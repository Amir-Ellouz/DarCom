import { createAction, props } from '@ngrx/store';
import { Discount } from 'src/app/core/models/base-models/discount';
import { GetDiscountParams } from 'src/app/core/models/dto/get-discount-params';

export const START_FETCHING_DISCOUNT = '[DISCOUNT] START_FETCHING_DISCOUNT';
export const FETCHED_DISCOUNT = '[DISCOUNT] FETCHED_DISCOUNT';
export const ERROR_DISCOUNT = '[DISCOUNT] ERROR_FETCHING_DISCOUNT';
export const CLEAR_DISCOUNT_ERROR = '[DISCOUNT] CLEAR_DISCOUNT_ERROR';

export const startFetchingDiscounts = createAction(
  START_FETCHING_DISCOUNT,
  props<{ params: GetDiscountParams }>()
);

export const fetchedDiscounts = createAction(
  FETCHED_DISCOUNT,
  props<{ discounts: Discount[] }>()
);

export const errorFetchingDiscount = createAction(
  ERROR_DISCOUNT,
  props<{ error: string }>()
);

export const clearDiscountError = createAction(CLEAR_DISCOUNT_ERROR);
