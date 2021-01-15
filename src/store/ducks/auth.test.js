import { authLoginSuccess, AUTH_LOGIN_SUCCESS } from './auth';

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
