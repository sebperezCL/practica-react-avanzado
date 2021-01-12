import storage from '../../utils/storage';

/**
 *! Estado inicial para App
 **/
const initialState = {
  app: {
    name: '',
    status: {
      error: false,
      errorMessage: '',
      apiCallsInProgress: 0,
    },
    filters: storage.get('filters') || {
      name: '',
      price: [],
      sale: 'all',
      tags: [],
    },
    adverts: null,
  },
};

/**
 ** Action Types
 **/
export const APP_START = 'nodepop/app/START';
export const APP_API_CALL_ERROR = 'nodepop/app/API_CALL_ERROR';
export const APP_BEGIN_API_CALL = 'nodepop/app/BEGIN_API_CALL';
export const APP_UPDATE_FILTERS = 'nodepop/app/APP_UPDATE_FILTERS';

/**
 ** Action Creators
 **/
export const appStart = (appName, storedFilters) => {
  return {
    type: APP_START,
    payload: {
      appName,
      storedFilters,
    },
  };
};

export const apiCallError = message => {
  return {
    type: APP_API_CALL_ERROR,
    payload: {
      message,
    },
  };
};

export const beginApiCall = () => {
  return { type: APP_BEGIN_API_CALL };
};

export const updateFilters = filters => {
  return {
    type: APP_UPDATE_FILTERS,
    payload: {
      filters,
    },
  };
};

export const searchAdverts = filters => {
  return async function (dispatch, getState, { history, api }) {
    const {
      app: { filters: prevFilters },
    } = getState();
    if (JSON.stringify(filters) !== JSON.stringify(prevFilters)) {
      dispatch(beginApiCall());
      dispatch(updateFilters(filters));
    }
    try {
      //const token = await api.auth.login(loginData);
      //dispatch(authLoginSuccess({ email: loginData.email, token }));
      // Navigate to previously required route
      //const { from } = location.state || { from: { pathname: '/' } };
      //history.replace(from);
    } catch (error) {
      console.log(error);
      dispatch(apiCallError(error));
    }
  };
};

/**
 ** Selectors
 */

export const getAppName = state => state.app.name;
export const apiLoading = state => state.app.status.apiCallsInProgress > 0;
export const getErrorMessage = state => state.app.status.errorMessage;
export const getFilters = state => state.app.filters;
export const getAdverts = state => state.app.adverts;

/**
 *! Reducer
 **/
export default function reducer(state = initialState.app, action) {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        name: action.payload.appName,
        filters: action.payload.storedFilters || state.filters,
      };
    case APP_API_CALL_ERROR:
      //! Los Errores al API terminan acá
      return {
        ...state,
        status: {
          error: true,
          errorMessage: action.payload.message,
          apiCallsInProgress: state.status.apiCallsInProgress - 1,
        },
      };
    case APP_BEGIN_API_CALL:
      //* Al comienzo de una llamada al API deben aumentar apiCallsInProgress
      //* También se limpia el estado de error
      return {
        ...state,
        status: {
          error: false,
          errorCode: 0,
          errorMessage: '',
          apiCallsInProgress: state.status.apiCallsInProgress + 1,
        },
      };
    case APP_UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
      };
    default:
      //? Todas las acciones que terminan en SUCCESS deben
      //? descontar de las apiCallsInProgress
      if (actionTypeEndsInSuccess(action.type)) {
        return {
          ...state,
          status: {
            error: false,
            errorCode: 0,
            errorMessage: '',
            apiCallsInProgress: state.status.apiCallsInProgress - 1,
          },
        };
      }
      return state;
  }
}

/**
 ** HELPERS
 */

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}
