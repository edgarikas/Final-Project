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
      console.log('lop');
      const newFavorites = state.favoritesCoins.filter(
        (id) => id !== action.id
      );
      return { ...state, favoritesCoins: newFavorites };
    }
    case 'ADD_FAVORITES': {
      const newFavorites = state.favorites.concat(action.id);
      window.localStorage.setItem(
        FAVORITESCOINS_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      return {
        ...state,
        favoritesCoins: state.favoritesCoins.concat(action.id),
      };
    }
    default:
      return state;
  }
}

export default reducer;
