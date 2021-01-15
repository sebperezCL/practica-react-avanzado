import { APP_SET_ADVERTS, setAdverts } from './app';

describe('setAdverts', () => {
  test('should creat a APP_SET_ADVERTS action with adverts as payload', () => {
    const adverts = ['1', '2'];
    const expectedAction = {
      type: APP_SET_ADVERTS,
      payload: { adverts },
    };

    const action = setAdverts(adverts);
    expect(action).toEqual(expectedAction);
  });
});
