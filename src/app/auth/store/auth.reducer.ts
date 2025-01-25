import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;

  isAuthenticated: boolean;

  loading: boolean;

  error: string | null;
}

export const authInitialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.signInSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      isAuthenticated: true,
      error: null,
      loading: false,
    };
  }),
  on(AuthActions.signInStarted, (state, action) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(AuthActions.signUpStarted, (state, action) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(AuthActions.signUpSuccess, (state, action) => {
    return {
      ...state,
      error: null,
      loading: false,
    };
  }),
  on(AuthActions.authenticationFailed, (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      error: action.error,
      loading: false,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      error: null,
      token: null,
    };
  }),
  on(AuthActions.clearAuthError, (state) => {
    return {
      ...state,
      error : null
    };
  }),
)
const authFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthenticationError = createSelector(
  authFeatureState,
  (state: AuthState) => state.error
);


export const isSignedIn=createSelector(
  authFeatureState,
  (state )=>state.isAuthenticated
)

export const getLoading = createSelector(
  authFeatureState,
  (state: AuthState) => state.loading
);


export const getToken=createSelector(
  authFeatureState,
  (state )=>state.token
)
