import { Component, OnDestroy } from '@angular/core';
import { GenericComponent } from '../shared/generic/generic.component';
import {
  DiscountState,
  getDiscounts,
  getDiscountsError,
  getDiscountsLoading,
} from './store/discount.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  clearDiscountError,
  startFetchingDiscounts,
} from './store/discount.actions';
import { Observable, tap } from 'rxjs';
import { Discount } from '../core/models/base-models/discount';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
  standalone: false,
})
export class DiscountComponent extends GenericComponent implements OnDestroy {
  discounts$: Observable<Discount[]>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<DiscountState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    super(store.select(getDiscountsError), store, dialog, clearDiscountError);
    this.activatedRoute.queryParams
      .pipe(
        tap((params) => {
          this.store.dispatch(
            startFetchingDiscounts({
              params: { page: +params['page'] },
            })
          );
        })
      )
      .subscribe();
    this.loading$ = this.store.select(
      getDiscountsLoading
    ) as Observable<boolean>;
    this.discounts$ = this.store.select(getDiscounts);
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  addPage() {
    const page = this.activatedRoute.snapshot.queryParams['page'];
    this.router.navigate([], {
      queryParams: {
        page: +page + 1,
      },
    });
  }
}
