import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App, { Root } from './components/App';
import { configureStore } from './store';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

const history = createBrowserHistory();

const store = configureStore(token ? { auth: token } : {}, { history });

ReactDOM.render(
  <Root store={store} history={history}>
    <App isInitiallyLogged={!!token} />
  </Root>,
  document.getElementById('root')
);
