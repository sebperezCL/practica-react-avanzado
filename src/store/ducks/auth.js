/**
 ** Estado inicial para Auth
 **/
const initialState = {
  auth: {
    email: '',
  },
};

/**
 ** Action Types
 **/
export const AUTH_LOGIN = 'phi/auth/LOGIN';
export const AUTH_LOGOUT = 'phi/auth/LOGOUT';
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

/**
 ** Action Creators
 **/
export const authLogin = userData => {
  return {
    type: AUTH_LOGIN,
    payload: {
      userData,
    },
  };
};

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
    const { email, password, remember } = loginData;
    //dispatch(beginApiCall());
    try {
      const userData = await api.auth.login({ email, password }, remember);
      dispatch(authLoginSuccess(userData));
      history.push('/dashboard');
    } catch (error) {
      //dispatch(apiCallError(error.errorCode, error.message));
    }
  };
};

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
