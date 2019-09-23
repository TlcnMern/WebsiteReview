import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cookie from 'react-cookies';
import rootReducer from './reducers';

import {
  LOGIN_SUCCESS
} from './action/type';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: LOGIN_SUCCESS });
}

export default store;
