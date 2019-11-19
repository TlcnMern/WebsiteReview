import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {auth} from './config/helper';

import {
  LOGIN_SUCCESS
} from './config/type';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


const jwt=auth.isAuthenticated();


//tức nếu còn jwt thì thằng isAuthenticated vẫn luôn đúng
if (jwt) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: LOGIN_SUCCESS });
}

export default store;
