import storage from '../../utils/storage';

const { REACT_APP_API_HOST: host } = process.env;

/**
 ** Estado inicial para App
 **/
const initialState = {
  app: {
    name: '',
    status: {
      error: false,
      errorMessage: '',
      apiCallsInProgress: 0,
    },
    tags: null,
    filters: storage.get('filters') || {
      name: '',
      price: [],
      sale: 'all',
      tags: [],
    },
    adverts: [],
  },
};

/**
 ** Action Types
 **/
export const APP_START = 'nodepop/app/START';
export const APP_BEGIN_API_CALL = 'nodepop/app/BEGIN_API_CALL';
export const APP_API_CALL_ERROR = 'nodepop/app/API_CALL_ERROR';
export const APP_API_CALL_SUCCESS = 'nodepop/app/API_CALL_SUCCESS';
export const APP_SET_TAGS = 'nodepop/app/APP_SET_TAGS';
export const APP_UPDATE_FILTERS = 'nodepop/app/APP_UPDATE_FILTERS';
export const APP_GET_ADVERTS = 'nodepop/app/APP_GET_ADVERTS';
export const APP_SET_ADVERTS = 'nodepop/app/APP_SET_ADVERTS';
export const APP_NEW_ADVERT = 'nodepop/app/APP_NEW_ADVERT';

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

export const apiCallSuccess = () => {
  return {
    type: APP_API_CALL_SUCCESS,
  };
};

export const beginApiCall = () => {
  return { type: APP_BEGIN_API_CALL };
};

export const setTags = tags => {
  return {
    type: APP_SET_TAGS,
    payload: {
      tags,
    },
  };
};

export const updateFilters = filters => {
  return {
    type: APP_UPDATE_FILTERS,
    payload: {
      filters,
    },
  };
};

export const setAdverts = adverts => {
  return {
    type: APP_SET_ADVERTS,
    payload: {
      adverts,
    },
  };
};

export const newAdvert = advert => {
  return {
    type: APP_NEW_ADVERT,
    payload: {
      advert,
    },
  };
};

export const searchAdverts = (filters, forceLoad) => {
  return async function (dispatch, getState, { api }) {
    const {
      app: { filters: prevFilters },
    } = getState();
    if (JSON.stringify(filters) !== JSON.stringify(prevFilters) || forceLoad) {
      storage.set('filters', filters);
      dispatch(updateFilters(filters));
      dispatch(beginApiCall());
      try {
        const { result } = await api.adverts.getAdverts(formatFilters(filters));
        result.rows.map(
          r => (r.photoUrl = r.photo ? `${host}${r.photo}` : null)
        );
        dispatch(setAdverts(result.rows));
        dispatch(apiCallSuccess());
      } catch (error) {
        const { message } = error;
        dispatch(apiCallError(message));
      }
    }
  };
};

export const createAdvert = advert => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(beginApiCall());
    try {
      const { result } = await api.adverts.createAdvert(advert);
      result.photoUrl = `${host}${result.photo}`;
      dispatch(newAdvert(result));
      dispatch(apiCallSuccess());
      history.push(`/adverts/${result._id}`);
    } catch (error) {
      const { message } = error;
      dispatch(apiCallError(message));
    }
  };
};

export const deleteAdvert = advertId => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(beginApiCall());
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(apiCallSuccess());
      history.push(`/`);
    } catch (error) {
      const { message } = error;
      dispatch(apiCallError(message));
    }
  };
};

export const searchTags = () => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(beginApiCall());
    try {
      const { result } = await api.adverts.getTags();
      dispatch(setTags(result));
      dispatch(apiCallSuccess());
      history.push(`/`);
    } catch (error) {
      const { message } = error;
      dispatch(apiCallError(message));
    }
  };
};

/**
 ** Selectors
 */

export const getAppName = state => state.app.name;
export const apiLoading = state => state.app.status.apiCallsInProgress > 0;
export const getErrorMessage = state => state.app.status.errorMessage;
export const isError = state => state.app.status.error;
export const getTags = state => state.app.tags;
export const getFilters = state => state.app.filters;
export const getAdverts = state => state.app.adverts;
export const getAdvert = adverdId => state =>
  state.app.adverts.filter(advert => advert._id === adverdId)[0] || null;

/**
 ** Reducer
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
      console.log(action.payload.message);
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
          errorMessage: '',
          apiCallsInProgress: state.status.apiCallsInProgress + 1,
        },
      };
    case APP_SET_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };
    case APP_UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
      };
    case APP_SET_ADVERTS:
      return {
        ...state,
        adverts: action.payload.adverts,
      };
    case APP_NEW_ADVERT:
      return {
        ...state,
        adverts: [...state.adverts, action.payload.advert],
      };
    default:
      //? Todas las acciones que terminan en SUCCESS deben
      //? descontar de las apiCallsInProgress
      if (actionTypeEndsInSuccess(action.type)) {
        return {
          ...state,
          status: {
            error: false,
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

function formatFilters(unformattedFilters) {
  const { name, sale, price, tags } = unformattedFilters;

  const filters = {};
  if (name) {
    filters.name = name;
  }
  if (['sell', 'buy'].includes(sale)) {
    filters.sale = sale === 'sell';
  }
  if (price.length) {
    filters.price = price.join('-');
  }
  if (tags.length) {
    filters.tags = tags.join(',');
  }
  return filters;
}
