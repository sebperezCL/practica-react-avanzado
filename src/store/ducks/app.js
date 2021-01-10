/**
 *! Estado inicial para App
 **/
const initialState = {
  app: {
    name: '',
    status: {
      error: false,
      errorCode: 0,
      errorMessage: '',
      apiCallsInProgress: 0,
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
export const appStart = appName => {
  return {
    type: APP_START,
    payload: {
      appName,
    },
  };
};

export const apiCallError = (code, message) => {
  return {
    type: APP_API_CALL_ERROR,
    payload: {
      code,
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

/**
 *! Reducer
 **/
export default function reducer(state = initialState.app, action) {
  switch (action.type) {
    case APP_START:
      return { ...state, name: action.payload.appName };
    case APP_API_CALL_ERROR:
      //! Los Errores al API terminan acá
      return {
        ...state,
        status: {
          error: true,
          errorCode: action.payload.code,
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
