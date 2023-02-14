import { FAVORITESCOINS_STORAGE_KEY } from '../constants';
import * as TYPES from './types';

const INITIAL_STATE = {
  favoritesCoins:
    JSON.parse(window.localStorage.getItem(FAVORITESCOINS_STORAGE_KEY)) || [],
  coins: null,
  coin: null,
  loading: false,
  error: false,
  cryptoCount: 100,
  coinHistory: [],
  homeLoading: false,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.REMOVE_FAVORITE: {
      const newFavorites = state.favoritesCoins.filter(
        (id) => id !== action.id
      );
      return { ...state, favoritesCoins: newFavorites };
    }
    case TYPES.ADD_FAVORITE: {
      const newFavorites = state.favoritesCoins.concat(action.id);
      window.localStorage.setItem(
        FAVORITESCOINS_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      return {
        ...state,
        favoritesCoins: state.favoritesCoins.concat(action.id),
      };
    }
    case TYPES.REMOVE_ALL_CRYPTOS: {
      console.log('aaaa');
      window.localStorage.removeItem(FAVORITESCOINS_STORAGE_KEY);
      return { ...state, favoritesCoins: [] };
    }

    case 'SET_CRYPTO_COUNT_LIST': {
      return state;
    }

    case TYPES.GET_COINS: {
      return { ...state, loading: true };
    }

    case TYPES.GET_COINS_SUCCESS: {
      return {
        ...state,
        coins: action.payload,
        loading: false,
      };
    }

    case TYPES.GET_COINS_FAILURE: {
      return { ...state, error: true, loading: false };
    }

    case TYPES.GET_DATA: {
      return { ...state, coin: action.payload, loading: false };
    }
    case TYPES.GET_COIN_HISTORY: {
      return { ...state, coinHistory: action.payload };
    }

    case TYPES.HOME_LOADING: {
      return { ...state, homeLoading: true };
    }
    case TYPES.HOME_LOADING_DONE: {
      return { ...state, homeLoading: false };
    }
    default:
      return state;
  }
}

export default reducer;
