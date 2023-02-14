import * as TYPES from './types';

const INITIAL_STATE = {
  loading: false,
  error: false,
  news: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.GET_NEWS: {
      return { ...state, loading: true };
    }

    case TYPES.GET_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload,
        loading: false,
      };
    }

    case TYPES.GET_NEWS_FAILURE: {
      return { ...state, error: true, loading: false };
    }
    default:
      return state;
  }
}

export default reducer;
