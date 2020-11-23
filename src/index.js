import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import storage from './utils/storage';
import { configureClient } from './api/client';

const auth = storage.get('auth') || { accessToken: null };

configureClient(auth.accessToken);

ReactDOM.render(
  <BrowserRouter>
    <App userInitiallyLogged={!!auth.accessToken} />
  </BrowserRouter>,
  document.getElementById('root')
);
