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
export const AUTH_LOGOUT_SUCCESS = 'phi/auth/LOGOUT_SUCCESS';
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';

/**
 ** Action Creators
 **/

export const authLoginSuccess = userData => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { userData },
});

export const authLogoutSuccess = () => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
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

export const logout = () => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(beginApiCall());
    try {
      await api.auth.logout();
      dispatch(authLogoutSuccess());
      //      history.push('/login');
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
    case AUTH_LOGOUT_SUCCESS:
      // logout
      return { ...state, ...initialState.auth };
    default:
      return state;
  }
}
