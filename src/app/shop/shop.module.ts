import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecommendationsComponent } from './product-details/recommendations/recommendations.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ShopComponent,
    ProductDetailsComponent,
    ProductsComponent,
    RecommendationsComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RouterModule,
    SharedModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ShopModule {}
