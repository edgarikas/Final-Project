import { FAVORITESCOINS_STORAGE_KEY } from '../constants';

const INITIAL_STATE = {
  favoritesCoins:
    JSON.parse(window.localStorage.getItem(FAVORITESCOINS_STORAGE_KEY)) || [],
  coins: [],
  loading: false,
  error: false,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'REMOVE_FAVORITES': {
      console.log(state);
      return { ...state };
    }
    default:
      return state;
  }
}

export default reducer;
