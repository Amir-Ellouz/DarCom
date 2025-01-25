import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {isSignedIn} from "../../../auth/store/auth.reducer";
import * as authActions from '../../../auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent {
  isAuthenticated: Observable<boolean>;
  
  constructor(private store: Store,private router: Router) {
    this.isAuthenticated = this.store.select(isSignedIn);
  }

  onClick() {
    this.store.dispatch(authActions.logout());
  }
}
