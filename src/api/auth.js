import client from './client';

import storage from '../utils/storage';

export const login = (crendentials, savePwd) =>
  client.login(crendentials).then((data) => {
    if (data) {
      if (savePwd) {
        storage.set('auth', { accessToken: data.token });
      }
      return true;
    }
    return false;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
  });
