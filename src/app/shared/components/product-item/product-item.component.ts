import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/base-models/product/product';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { startAddToBasket } from 'src/app/cart/store/cart.actions';
import { addToWishlist } from 'src/app/account/wishlist/Store/wishlist.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],  
  standalone: false,

})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private router: Router, private store: Store) {}

  onClick() {
    this.router.navigate([`shop/product/${this.product.id}`]);
  }

  onAddToCart() {
    this.store.dispatch(
      startAddToBasket({ productId: this.product, itemsNumber: 1 })
    );
  }

  onAddToWishlist() {
    console.log('Wishlist Clicked');
    this.store.dispatch(addToWishlist({ product: this.product }));
  }
}
