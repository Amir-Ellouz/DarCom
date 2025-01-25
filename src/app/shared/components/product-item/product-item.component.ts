import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/base-models/product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],  
  standalone: false,

})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  onClick() {
    console.log('item clicked')
  }

  onAddToCart() {
    console.log('Add to Cart Clicked');
  }

  onAddToWishlist() {
    console.log('Add to Wishlist Clicked');
  }
}
