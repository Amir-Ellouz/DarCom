import {createAction, props} from "@ngrx/store";
import {User} from "../../../core/models/base-models/user";
import {UpdateUserDto} from "../../../core/models/dto/update-user-dto";



const SET_USER = "[ACCOUNT] SET_USER"

const UPDATE_USER_START = "[ACCOUNT] UPDATE_USER_START"

const UPDATE_USER_SUCCESS = "[ACCOUNT] UPDATE_USER_SUCCESS"

const UPDATE_USER_FAIL = "[ACCOUNT] UPDATE_USER_FAIL"

const CLEAR_ERROR = "[ACCOUNT] CLEAR_ERROR"


export const setUser=createAction(
  SET_USER,
        props<{user : User}>()
)
export const updateUserStart=createAction(
  UPDATE_USER_START ,
  props<{userData : UpdateUserDto}>()
)


export const updateUserSuccess=createAction(
  UPDATE_USER_SUCCESS ,
  props<{userData : UpdateUserDto}>()

)


export const updateUserFail=createAction(
  UPDATE_USER_FAIL ,
  props<{error : string}>()

)

export const clearUserError=createAction(
  CLEAR_ERROR,
)
