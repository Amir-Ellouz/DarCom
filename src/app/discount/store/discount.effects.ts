import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DiscountRepositoryService } from 'src/app/core/repositories/discount-repository.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as DiscountActions from './discount.actions';

@Injectable()
export class DiscountEffects {
  constructor(
    private discountsRepository: DiscountRepositoryService,
    private actions$: Actions
  ) {}

  fetchDiscounts = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DiscountActions.startFetchingDiscounts),
        switchMap((params) => {
          return this.discountsRepository.getDiscounts(params.params).pipe(
            map((discount) => {
              return DiscountActions.fetchedDiscounts({ discounts: discount });
            }),
            catchError((err) => {
              return of(DiscountActions.errorFetchingDiscount({ error: err }));
            })
          );
        })
      ),
    { dispatch: true }
  );
}
