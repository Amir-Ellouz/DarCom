import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/core/models/base-models/order/order';
import { Product } from '../../../core/models/base-models/product/product';

export const START_FETCHING_ORDERS = '[ORDERS] START_FETCHING_ORDERS';
export const FETCHED_ORDERS = '[ORDERS] FETCHED_ORDERS';
export const ORDERS_ERROR = '[ORDERS] ORDERS ERROR';

export const MAKE_ORDER = '[ORDERS] MAKE_ORDER';

export const CLEAR_ORDER_ERROR = '[ORDERS] CLEAR_ORDER_ERROR';

export const MAKE_ORDER_SUCCESS = '[ORDERS] MAKE_ORDER_SUCCESS';
export const CLEAR_STATE = '[ORDERS] CLEAR_STATE';

export const startFetchingOrders = createAction(START_FETCHING_ORDERS);

export const fetchedOrders = createAction(
  FETCHED_ORDERS,
  props<{ orders: Order[] }>()
);

export const orderError = createAction(
  ORDERS_ERROR,
  props<{ error: string }>()
);

export const clearOrderError = createAction(CLEAR_ORDER_ERROR);

export const makeOrder = createAction(
  MAKE_ORDER,
  props<{ products: { product: Product; itemsNumber: number }[] }>()
);

export const makeOrderSuccess = createAction(
  MAKE_ORDER,
  props<{ products: Order }>()
);
export const clearState = createAction(CLEAR_STATE);
