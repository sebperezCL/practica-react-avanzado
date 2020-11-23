import axios from 'axios';
const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

client.login = (credentials) =>
  client.post('/auth/login', credentials).then(({ data }) => {
    if (data.ok) {
      setAuthorizationHeader(data.token);
      return data;
    }
    return null;
  });

client.logout = () =>
  new Promise((resolve) => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

export const configureClient = (accessToken) => {
  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};

export default client;
