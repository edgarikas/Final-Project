import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';

import contentReducer from '../content/reducer';

import middleware from './middleware';

//cia galima pridetidaugiau reducer's
const rootReducer = combineReducers({
  content: contentReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
