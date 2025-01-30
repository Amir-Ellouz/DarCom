import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/base-models/product/product';
import { Basket } from '../../core/models/base-models/basket/basket';

export const SET_BASKET = '[CART] SET_BASKET';

export const START_REMOVE_FROM_BASKET = '[CART] START_REMOVE_FROM_BASKET';

export const START_ADD_TO_BASKET = '[CART] START_ADD_TO_BASKET';

export const REMOVE_FROM_BASKET_SUCCESS = '[CART] REMOVE_FROM_BASKET_SUCCESS';

export const ADD_TO_BASKET_SUCCESS = '[CART] ADD_TO_BASKET_SUCCESS';

export const BASKET_ERROR = '[CART] BASKET_ERROR';

export const LOAD_BASKET = '[CART] LOAD BASKET FROM LOCAL STORAGE ';

export const CLEAR_ERROR = '[CART] CLEAR_ERROR';

export const CLEAR_STATE = '[CART] CLEAR_STATE';

export const startAddToBasket = createAction(
  START_ADD_TO_BASKET,
  props<{ productId: Product; itemsNumber: number }>()
);

export const removeFromBasketStart = createAction(
  START_REMOVE_FROM_BASKET,
  props<{ productId: number }>()
);

export const loadBasket = createAction(
  LOAD_BASKET,
);

export const setBasket = createAction(SET_BASKET, props<{ basket: Basket }>());

export const removeFromBasketSuccess = createAction(
  REMOVE_FROM_BASKET_SUCCESS,
  props<{ productId: number }>()
);

export const basketError = createAction(
  BASKET_ERROR,
  props<{ error: string }>()
);

export const clearError = createAction(CLEAR_ERROR);

export const addToBasketSuccess = createAction(
  ADD_TO_BASKET_SUCCESS,
  props<{ product: Product; itemsNumber: number }>()
);

export const clearState = createAction(CLEAR_STATE);
