import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';

import contentReducer from '../content/reducer';
import newsReducer from '../news/reducer';

import middleware from './middleware';

//cia galima pridetidaugiau reducer's
const rootReducer = combineReducers({
  content: contentReducer,
  news: newsReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
