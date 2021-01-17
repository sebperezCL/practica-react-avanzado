import reducer, {
  authLoginSuccess,
  login,
  getUser,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
} from './auth';
import { APP_BEGIN_API_CALL, APP_API_CALL_ERROR } from './app';

// Acción Síncrona
describe('authLoginSuccess', () => {
  test('should create AUTH_LOGIN_SUCCESS action with userData', () => {
    const userData = {
      email: 'email@email.com',
      token: 'string',
    };

    const expectedAction = {
      type: AUTH_LOGIN_SUCCESS,
      payload: { userData },
    };

    const action = authLoginSuccess(userData);
    expect(action).toEqual(expectedAction);
  });
});

// Acción Asíncrona
describe('login', () => {
  const dispatch = jest.fn();
  const loginData = {
    email: 'email@email.com',
    password: 'xx',
  };
  const userData = {
    email: 'email@email.com',
    token: 'token',
  };
  const history = {
    push: jest.fn(),
    replace: jest.fn(),
  };
  const thunkAction = login(loginData);

  test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
    const getState = jest.fn().mockReturnValue({ router: { location: '1' } });

    const api = { auth: { login: jest.fn().mockResolvedValue('token') } };

    await thunkAction(dispatch, getState, { history, api });

    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: APP_BEGIN_API_CALL });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AUTH_LOGIN_SUCCESS,
      payload: { userData },
    });
    expect(api.auth.login).toHaveBeenCalledWith(loginData);
    expect(history.replace).toHaveBeenCalled();
  });

  test('should dispatch an APP_API_CALL_ERROR action', async () => {
    const getState = jest.fn().mockReturnValue({ router: { location: '1' } });

    const api = { auth: { login: jest.fn().mockRejectedValue('error') } };

    await thunkAction(dispatch, getState, { history, api });

    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: APP_BEGIN_API_CALL });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: APP_API_CALL_ERROR,
      payload: { message: 'error' },
    });
    expect(api.auth.login).toHaveBeenCalledWith(loginData);
    expect(history.replace).not.toHaveBeenCalled();
  });
});

// Test del Reducer

describe('auth reducer', () => {
  const state = { email: '', token: '' };

  test('should handle a AUTH_LOGIN_SUCCESS action', () => {
    const action = {
      type: AUTH_LOGIN_SUCCESS,
      payload: { userData: { email: 'email@email.com', token: 'token' } },
    };
    const expectedState = {
      email: 'email@email.com',
      token: 'token',
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('should handle a AUTH_LOGOUT_SUCCESS action', () => {
    const action = {
      type: AUTH_LOGOUT_SUCCESS,
    };
    const expectedState = {
      email: '',
      token: '',
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('should handle ANY action', () => {
    const action = {
      type: 'ANY',
    };
    const expectedState = {
      email: '',
      token: '',
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
});

// Test Selector

describe('selector', () => {
  test('should return user email from state', () => {
    const state = {
      auth: {
        email: 'email@email.com',
        token: 'token',
      },
    };
    expect(getUser(state)).toEqual('email@email.com');
  });
});
