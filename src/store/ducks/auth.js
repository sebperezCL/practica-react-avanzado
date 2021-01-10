import { beginApiCall, apiCallError } from './app';

/**
 ** Estado inicial para Auth
 **/
const initialState = {
  auth: {
    email: '',
    token: '',
  },
};

/**
 ** Action Types
 **/
export const AUTH_LOGOUT = 'phi/auth/LOGOUT';
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

/**
 ** Action Creators
 **/

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = userData => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { userData },
});

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const login = loginData => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(beginApiCall());
    try {
      const token = await api.auth.login(loginData);
      dispatch(authLoginSuccess({ email: loginData.email, token }));
      history.push('/adverts');
    } catch (error) {
      dispatch(apiCallError(error.errorCode, error.message));
    }
  };
};

/**
 ** Selectors
 */

export const getUser = state => state.auth.email;

/**
 *! Reducer
 **/
export default function reducer(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      // login
      return { ...state, ...action.payload.userData };
    case AUTH_LOGOUT:
      // logout
      return { ...state, ...initialState.auth };
    default:
      return state;
  }
}
