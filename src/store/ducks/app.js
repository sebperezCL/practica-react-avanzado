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
  },
};

/**
 ** Action Types
 **/
export const APP_START = 'phi/app/START';
export const APP_API_CALL_ERROR = 'phi/app/API_CALL_ERROR';
export const APP_BEGIN_API_CALL = 'phi/app/BEGIN_API_CALL';

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

/**
 ** Selectors
 */

export const getAppName = state => state.app.name;
export const apiLoading = state => state.app.status.apiCallsInProgress > 0;
export const getErrorMessage = state => state.app.status.errorMessage;
export const getFilters = state => state.app.filters;

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
