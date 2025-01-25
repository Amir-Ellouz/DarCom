import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignUpDto } from 'src/app/core/models/dto/sign-up.dto';
import {AuthState, getAuthenticationError, getLoading} from '../store/auth.reducer';
import * as authActions from '../store/auth.actions';
import { GenericComponent } from 'src/app/shared/generic/generic.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {clearAuthError} from "../store/auth.actions";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: false,
})
export class SignUpComponent extends GenericComponent implements OnDestroy {
  form: FormGroup;
  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<AuthState>, private dialog: MatDialog) {
    super(store.select(getAuthenticationError), store, dialog, clearAuthError);
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      address: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  ngOnDestroy(): void {
    this.destroySubscription();
  }

  onSubmit() {
    const formValues = this.form.value;
    const dto: SignUpDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      password: formValues.password,
    };
    this.store.dispatch(authActions.signUpStarted(dto));
    this.loading$ = this.store.select(getLoading);
  }
  ngOnInit() {
    console.log('Component loaded');
  }
}
