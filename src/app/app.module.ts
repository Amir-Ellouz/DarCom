import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RoutingModule} from "./routing.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {authReducer} from "./auth/store/auth.reducer";
import {AuthEffects} from "./auth/store/auth.effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import { productReducer } from './shop/store/product.reducer';
import {ProductEffects} from "./shop/store/product.effects";

import { wishlistEffects } from './account/wishlist/Store/wishlist.effects';
import { GeneralDetailsEffect } from './account/general-details/Store/general-details.effect';
import { CartEffects } from './cart/store/cart.effects';
import { cartReducer } from './cart/store/cart.reducer';
import { OrdersEffects } from './account/orders/Store/orders.effect';
import { wishlistReducer } from './account/wishlist/Store/wishlist.reducer';
import { ordersReducer } from './account/orders/Store/orders.reducer';
import { userReducer } from './account/general-details/Store/general-details.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      auth: authReducer,
      products: productReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      orders: ordersReducer,
      user: userReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductEffects,
      wishlistEffects,
      GeneralDetailsEffect,
      CartEffects,
      OrdersEffects,
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
