import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {isSignedIn} from "../../../auth/store/auth.reducer";
import * as authActions from '../../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { getBasketItemNumber } from 'src/app/cart/store/cart.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent {
  isAuthenticated: Observable<boolean>;
  itemsNumber: Observable<number>;

  constructor(private store: Store, private router: Router) {
    this.isAuthenticated = this.store.select(isSignedIn);
    this.itemsNumber = this.store.select(getBasketItemNumber);
  }

  onClick() {
    this.store.dispatch(authActions.logout());
  }
}
