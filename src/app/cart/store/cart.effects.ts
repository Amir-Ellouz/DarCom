import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as CartActions from "./cart.actions"
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {BasketRepositoryService} from "../../core/repositories/basket-repository.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BasketState, getBasket} from "./cart.reducer";
import {Store} from "@ngrx/store";
import {Basket} from "../../core/models/base-models/basket/basket";
import {BasketProduct} from "../../core/models/base-models/basket/basket-product";


@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartRepository: BasketRepositoryService,
    private store: Store<BasketState>
  ) {}

  addToBasket = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartActions.startAddToBasket),
        switchMap((action) => {
          return this.cartRepository
            .addToBasket(action.productId.id!, action.itemsNumber)
            .pipe(
              map(() => {
                return CartActions.addToBasketSuccess({
                  product: action.productId,
                  itemsNumber: action.itemsNumber,
                });
              }),
              catchError((er: HttpErrorResponse) => {
                return of(
                  CartActions.basketError({
                    error: er.error.message.toString(),
                  })
                );
              })
            );
        })
      );
    },
    { dispatch: true }
  );

  removeFromBasket = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartActions.removeFromBasketStart),
        switchMap((action) => {
          console.log(action);

          return this.cartRepository.removeFromBasket(action.productId).pipe(
            map((value) => {
              return CartActions.removeFromBasketSuccess({
                productId: action.productId,
              });
            }),
            catchError((er: HttpErrorResponse) => {
              return of(
                CartActions.basketError({ error: er.error.message.toString() })
              );
            })
          );
        })
      );
    },
    { dispatch: true }
  );

  storeBasketToLocalStorage = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartActions.setBasket),
        tap((value) => {
          localStorage.setItem('basket', JSON.stringify(value.basket));
        })
      );
    },
    { dispatch: false }
  );

  loadBasketFromLocalStorage = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.loadBasket),
      map(() => {
        const storedBasket = localStorage.getItem('basket');
        return storedBasket ? JSON.parse(storedBasket) : [];
      }),
      map((basket) => CartActions.setBasket({ basket }))
    );
  });
  
  updateBasketSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CartActions.removeFromBasketSuccess,
          CartActions.addToBasketSuccess
        ),
        withLatestFrom(this.store.select(getBasket)),
        tap(([_, value]) => {
          let prevBasket: Basket | null = null;
          const preBasketSerialized = localStorage.getItem('basket');

          // Try to retrieve and parse the existing basket
          if (preBasketSerialized) {
            try {
              prevBasket = JSON.parse(preBasketSerialized);
            } catch (error) {
              console.error('Error parsing localStorage basket:', error);
            }
          }

          // If there's no previous basket, create a new one with a unique ID
          if (!prevBasket) {
            console.warn('No previous basket found. Creating a new one.');
            prevBasket = {
              id: Date.now(), // Generate a unique ID (timestamp-based)
              basketProduct: [],
            };
          }

          // Create a new products array
          const newProducts: BasketProduct[] = value.map((elem) => ({
            itemsNumber: elem.itemsNumber,
            product: elem.product,
          }));

          console.log('Previous Basket:', prevBasket);

          // Create the updated basket object
          const newBasket: Basket = {
            id: prevBasket.id, // Ensure ID is preserved
            basketProduct: newProducts,
          };

          // Save to localStorage
          localStorage.setItem('basket', JSON.stringify(newBasket));
          console.log('Updated Basket saved to localStorage:', newBasket);
        })
      );
    },
    { dispatch: false }
  );
}
