import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthState, getAuthenticationError, getLoading} from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth.actions';
import { GenericComponent } from 'src/app/shared/generic/generic.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {clearAuthError} from "../store/auth.actions";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: false
})
export class SignInComponent extends GenericComponent implements OnDestroy {
  form: FormGroup;
  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<AuthState>, private dialog: MatDialog) {
    super(
      store.select(getAuthenticationError),
      store,
      dialog,
      clearAuthError
    );
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
    this.loading$ = this.store.select(getLoading);
  }
  ngOnDestroy(): void {
    this.destroySubscription();
  }

  onSubmit() {
    const formValues = this.form.value;
    this.store.dispatch(
      authActions.signInStarted({
        email: formValues.email,
        password: formValues.password,
      })
    );
  }
}
