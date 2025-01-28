import {Component, OnDestroy} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Product} from "../core/models/base-models/product/product";
import {Store} from "@ngrx/store";
import {getProducts, getProductsError, getProductsLoading, ProductState} from "./store/product.reducer";
import * as ProductsActions from "./store/product.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GenericComponent} from "../shared/generic/generic.component";
import {clearProductError} from "./store/product.actions";
import { BehaviorSubject, combineLatest, map } from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: false,
})

export class ShopComponent extends GenericComponent implements OnDestroy {
  products$: Observable<Product[]>; // The original products observable
  filteredProducts$ = new BehaviorSubject<Product[]>([]); // Filtered and paginated products
  allProducts: Product[] = []; // Store all products
  loading$: Observable<boolean>;
  minPrice?: number; 
  maxPrice?: number;
  currentPage$ = new BehaviorSubject<number>(1);
  itemsPerPage = 6; // Adjust based on your needs

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
              params: { page: +params["page"], category: params["category"] },
            })
          );
        })
      )
      .subscribe();

    this.loading$ = this.store.select(getProductsLoading);
    
    // Subscribe to the products observable and store all products
    this.products$ = this.store.select(getProducts);
    this.products$.subscribe((products) => {
      this.allProducts = products; 
      this.paginateProducts();
    });

    // Update paginated products when the page changes
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
        page: 1,
      },
    });
    this.currentPage$.next(1); // Reset page when changing category
  }

  addPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  paginateProducts() {
    const currentPage = this.currentPage$.value;
    const paginatedProducts = this.allProducts.slice(0, currentPage * this.itemsPerPage);
    this.filteredProducts$.next(paginatedProducts);
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
    this.currentPage$.next(1); // Reset pagination
    this.paginateProducts();
  }
}
