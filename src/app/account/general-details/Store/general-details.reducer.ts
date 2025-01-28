import {createReducer, on} from "@ngrx/store";
import {User} from "../../../core/models/base-models/user";
import * as GeneralDetailsActions from "./general-details.action";

export interface AccountState {
  user :    User | null
  error :   string | null
  loading : boolean
}

const initialState : AccountState = {
  user : null,
  error : null ,
  loading : false
}

export const userReducer=createReducer(
  initialState ,
  on(GeneralDetailsActions.setUser ,
    (state, {user})=>{
      return {
        ...state,
        user : user,
        error : null ,
        loading : false,
      }
    }
  ),
  on(GeneralDetailsActions.updateUserStart ,
    (state)=>{
      return {
        ...state,
        error : null,
        loading : true,
      }
    }
  ),
  on(GeneralDetailsActions.updateUserSuccess ,
    (state,action) => {
      return {
          ...state,
          user : action.userData as User,
          error : null,
          loading : false,
        }
    }
  ),
  on(GeneralDetailsActions.updateUserFail,
    (state,action)=>{
      return {
        ...state,
        error : action.error,
        loading : false,
      }
    }
  ),
  on(GeneralDetailsActions.clearUserError,
    (state,action)=>{
      return {
        ...state,
        error : null,
      }
    }
  ),
)
