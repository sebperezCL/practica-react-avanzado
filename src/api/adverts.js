import client from './client';
import queryString from 'query-string';

const advertsBaseUrl = '/adverts';

export const getAdverts = filters => {
  const filterString = queryString.stringify(
    Object.fromEntries(
      // limpiar campos que vienen vacíos
      Object.entries(filters).filter(value => (value[1] ? value : null))
    )
  );
  return client.get(`${advertsBaseUrl}/?${filterString}`);
};

export const getAllowedTags = () => {
  return client.get(`${advertsBaseUrl}/tags`);
};
