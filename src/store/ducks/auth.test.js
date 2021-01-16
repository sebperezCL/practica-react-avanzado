import { authLoginSuccess, AUTH_LOGIN_SUCCESS, login } from './auth';
import { APP_BEGIN_API_CALL } from './app';

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
    token: 'string',
  };
  const history = {
    push: jest.fn(),
    replace: jest.fn(),
  };
  const thunkAction = login(loginData);
  test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
    const token = 'token';
    const api = { auth: { login: jest.fn().mockResolvedValue(token) } };
    const getState = jest.fn().mockReturnValue({ router: { location: '1' } });

    await thunkAction(dispatch, getState, { history, api });

    expect(getState).toHaveBeenCalled();
    //expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: APP_BEGIN_API_CALL });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AUTH_LOGIN_SUCCESS,
      payload: {
        email: '',
        token: '',
      },
    });
    expect(api.auth.login).toHaveBeenCalledWith(loginData);
    expect(history.replace).toHaveBeenCalled();
  });
});
