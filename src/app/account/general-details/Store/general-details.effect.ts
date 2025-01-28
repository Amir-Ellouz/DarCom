import {Injectable} from "@angular/core";
import {UserRepositoryService} from "../../../core/repositories/user-repository.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as GeneralDetailsActions from "./general-details.action"
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AccountState} from "./general-details.reducer";
import {Store} from "@ngrx/store";
import {selectUser} from "./general-details.selector";

@Injectable()
export class GeneralDetailsEffect {


  constructor(private userRepository : UserRepositoryService,private actions : Actions,private store : Store<AccountState>) {
  }



  updateUser = createEffect(()=>{
    return this.actions.pipe(
      ofType(GeneralDetailsActions.updateUserStart),
      switchMap((data)=>{
        return this.userRepository.updateUserData(data.userData).pipe(
          map(
            ()=>{
              console.log("Updated Success")
              return GeneralDetailsActions.updateUserSuccess({userData : data.userData})
            }
          ),
          catchError((err : HttpErrorResponse) => {
            console.log("Update Error",err)
            return of(GeneralDetailsActions.updateUserFail({error : err.error.message.toString()}))
          })
        )
      })
    )
  })


  storeUserToLocalStorage = createEffect(()=>{
    return this.actions.pipe(
      ofType(GeneralDetailsActions.setUser),
      tap(value => {
        localStorage.setItem("user",JSON.stringify(value.user))
      })
    )
  },{dispatch : false})


  updateSuccess = createEffect(()=>{
    return this.actions.pipe(
      ofType(GeneralDetailsActions.updateUserSuccess),
      withLatestFrom(this.store.select(selectUser)),
      tap(([,prevState] ) => {
        localStorage.setItem("user",JSON.stringify(prevState))
      })
    )
  },{dispatch : false})

}
