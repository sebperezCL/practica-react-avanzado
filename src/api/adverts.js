import client from './client';

const advertsBaseUrl = '/adverts';

export const getAdverts = () => {
  return client.get(advertsBaseUrl);
};
