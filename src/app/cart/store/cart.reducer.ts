import { Product } from '../../core/models/base-models/product/product';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface BasketState {
  error: string | null;
  loading: boolean;
  products: {
    product: Product;
    itemsNumber: number;
  }[];
}

export const cartInitialState: BasketState = {
  error: null,
  loading: false,
  products: [],
};

export const cartReducer = createReducer(
  cartInitialState,

  on(CartActions.setBasket, (state, action) => {
    const products = action.basket.basketProduct.map((element) => {
      return {
        product: element.product,
        itemsNumber: element.itemsNumber,
      };
    });
    return {
      ...state,
      products: products,
    };
  }),
  on(CartActions.addToBasketSuccess, (state, action) => {
    const prevProducts = [...state.products];
    const newPrevProductsRef = prevProducts.map((ele) => {
      return {
        ...ele,
      };
    });
    newPrevProductsRef.push({
      product: action.product,
      itemsNumber: action.itemsNumber,
    });
    return {
      ...state,
      products: newPrevProductsRef,
      loading: false,
    };
  }),

  on(CartActions.removeFromBasketSuccess, (state, action) => {
    const prevState = [...state.products];
    const newState = prevState.filter(
      (element) => element.product.id! != action.productId
    );
    return {
      ...state,
      loading: false,
      products: newState,
    };
  }),

  on(CartActions.removeFromBasketStart, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(CartActions.startAddToBasket, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CartActions.basketError, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  on(CartActions.clearError, (state) => {
    return {
      ...state,
      error: null,
    };
  }),
  on(CartActions.clearState, (state) => {
    return {
      state: cartInitialState,
      error: null,
      loading: false,
      products: [],
    };
  })
);

const cartFeature = createFeatureSelector<BasketState>('cart');

export const getBasket = createSelector(cartFeature, (state) => state.products);
export const cartFeatureState =
  createFeatureSelector<BasketState>('cartReducer');

export const getBasketProducts = createSelector(
  cartFeatureState,
  (state) => state.products
);

export const getBasketError = createSelector(
  cartFeatureState,
  (state) => state.error
);

export const getBasketLoading = createSelector(
  cartFeatureState,
  (state) => state.loading
);

export const getBasketItemNumber = createSelector(
  cartFeature,
  (state) => state.products.length
);
