import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthState, isSignedIn} from "../auth/store/auth.reducer";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const store : Store = inject(Store<AuthState>)
  const router : Router = inject(Router)
  return store.select(isSignedIn).pipe(
    map(
      (value)=>{
        return value ? value : router.createUrlTree(['/auth/sign-in'])
      }
    )
  );
};
