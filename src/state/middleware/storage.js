import { FAVORITESCOINS_STORAGE_KEY } from '../../constants';
import * as types from '../../content/types';
import * as selectors from '../../content/selectors';

const storage =
  ({ getState }) =>
  (next) =>
  (action) => {
    next(action);

    const postActionState = getState();
    switch (action.type) {
      case types.ADD_FAVORITE:
      case types.REMOVE_FAVORITE:
        const favorites = selectors.getFavorites(postActionState);

        window.localStorage.setItem(
          FAVORITESCOINS_STORAGE_KEY,
          JSON.stringify(favorites)
        );
        break;
      case types.REMOVE_ALL_CRYPTOS:
        window.localStorage.removeItem(FAVORITESCOINS_STORAGE_KEY);
        break;
      default:
        break;
    }
  };

export default storage;
