import { Component, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Product } from '../core/models/base-models/product/product';
import { Store } from '@ngrx/store';
import { getProducts, getProductsError, getProductsLoading, ProductState } from './store/product.reducer';
import * as ProductsActions from './store/product.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from '../shared/generic/generic.component';
import { clearProductError } from './store/product.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: false,
})
export class ShopComponent extends GenericComponent implements OnDestroy {
  products$: Observable<Product[]>; // The original products observable
  filteredProducts$ = new BehaviorSubject<Product[]>([]); // Filtered products for the current page
  allProducts: Product[] = []; // Store all products
  loading$: Observable<boolean>;
  minPrice?: number;
  maxPrice?: number;

  currentPage$ = new BehaviorSubject<number>(1); // Current page
  totalPages = 1; // Total number of pages
  itemsPerPage = 6; // Items per page

  constructor(
    private store: Store<ProductState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    super(store.select(getProductsError), store, dialog, clearProductError);

    this.activatedRoute.queryParams
      .pipe(
        tap((params) => {
          this.store.dispatch(
            ProductsActions.startFetchingProducts({
              params: { category: params['category'] },
            })
          );
        })
      )
      .subscribe();

    this.loading$ = this.store.select(getProductsLoading);

    this.products$ = this.store.select(getProducts);
    this.products$.subscribe((products) => {
      this.allProducts = products;
      this.calculateTotalPages();
      this.paginateProducts();
    });

    this.currentPage$.subscribe(() => {
      this.paginateProducts();
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  navigateToCategory(category: string | null) {
    this.router.navigate([], {
      queryParams: {
        category: category,
      },
    });
    this.currentPage$.next(1); // Reset to the first page when the category changes
  }

  paginateProducts() {
    const currentPage = this.currentPage$.value;
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const paginatedProducts = this.allProducts.slice(startIndex, startIndex + this.itemsPerPage);
    this.filteredProducts$.next(paginatedProducts);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage$.next(page);
  }

  filterByPrice() {
    let filteredProducts = this.allProducts;

    if (this.minPrice != null || this.maxPrice != null) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price ?? 0;
        return (
          (this.minPrice == null || price >= this.minPrice) &&
          (this.maxPrice == null || price <= this.maxPrice)
        );
      });
    }

    this.allProducts = filteredProducts;
    this.calculateTotalPages(); // Recalculate pages after filtering
    this.currentPage$.next(1); // Reset to the first page
    this.paginateProducts();
  }
}
