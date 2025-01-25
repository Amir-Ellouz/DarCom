import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UserRepositoryService } from '../../core/repositories/user-repository.service';
import {catchError, map, of, switchMap, take, tap} from 'rxjs';
import * as AuthActions from './auth.actions';
import {User} from "../../core/models/base-models/user";
import {Basket} from "../../core/models/base-models/basket/basket";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class AuthEffects {
  constructor(
    private action: Actions,
    private router: Router,
    private authRepository: UserRepositoryService
  ) {console.log('Actions$:', this.action);}

  login = createEffect(
    () => {
      return this.action.pipe(
        ofType(AuthActions.signInStarted),
        switchMap((credentials) => {
          console.log('Credentials received in effect:', credentials);
          return this.authRepository
            .login(credentials.email, credentials.password)
            .pipe(
              tap((value) => {
                localStorage.setItem('token', value.token);
              }),
              map((value) => {
                return AuthActions.signInSuccess(value);
              }),
              catchError((err : HttpErrorResponse) => {
                console.log("Test Error",err)
                return of(AuthActions.authenticationFailed({error : err.error.message.toString()}));
              })
            );
        })
      );
    },
    { dispatch: true }
  );

  signUp = createEffect(
    () => {
      return this.action.pipe(
        ofType(AuthActions.signUpStarted),
        switchMap(({ type, ...cred }) => {
          return this.authRepository.signUp(cred).pipe(
            map(() => {
              return AuthActions.signUpSuccess();
            }),
            catchError((err : HttpErrorResponse) => {
              console.log("Test Error",err)
              return of(AuthActions.authenticationFailed({error : err.error.message.toString()}));
            })
          );
        })
      );
    },
    { dispatch: true }
  );

  signInSuccess = createEffect(
    () => {
      return this.action.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => {
          this.router.navigate(['/shop']);
        })
      );
    },
    { dispatch: false }
  );

  logout = createEffect(() => {
    return this.action.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.clear();
      })
    );
  },{dispatch : false}
  );

  signupSuccess = createEffect(
    () => {
      return this.action.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(() => {
          this.router.navigate(['/auth/sign-in']);
        })
      );
    },
    { dispatch: false }
  );


  autoLogin$ = createEffect(
    () => {
      return this.action.pipe(
        ofType(AuthActions.autoLogin),
        map(
        ()=>{
          const token = localStorage.getItem("token")
          if (token){
            const userSerialized = localStorage.getItem("user") ;
            const user : User = JSON.parse(userSerialized!)
            const basketSerialized = localStorage.getItem("basket")
            const basket : Basket = JSON.parse(basketSerialized!)
            console.log(user)
            console.log(basket)
            return AuthActions.signInSuccess({...user,basket : basket ,token : token})
          }else {
            return AuthActions.logout()
          }
        }
      )
    )
    },{dispatch : true}
  )


}
