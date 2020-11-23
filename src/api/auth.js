import client from './client';

import storage from '../utils/storage';

export const login = (crendentials) =>
  client.login(crendentials).then((data) => {
    if (data) {
      storage.set('auth', { accessToken: data.token });
      return true;
    }
    return false;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
  });
