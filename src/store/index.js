import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import auth from './ducks/auth';
import * as api from '../api';

export function configureStore(preloadedState, { history }) {
  const appReducers = { auth };

  const reducer = combineReducers({
    router: connectRouter(history),
    ...appReducers,
  });

  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument({ history, api }),
  ];

  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
}
