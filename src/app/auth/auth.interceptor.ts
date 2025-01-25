import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HttpHeaders
} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {AuthState, getToken} from "./store/auth.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store : Store<AuthState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("From Interceptor")
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap(token => {
        if (!token) {
          return next.handle(request);
        }
        const authorizedRequest = request.clone({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
        return next.handle(authorizedRequest);
      })
    );
  }
}
