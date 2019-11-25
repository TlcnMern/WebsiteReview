import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {auth} from './config/helper';
import jwt from 'jsonwebtoken';

import {
  LOGIN_SUCCESS,GET_AVATAR,LOGIN_SUCCESS_ADMIN
} from './config/type';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


const data=auth.isAuthenticated();
//cho nay ma hoa token ra ==>admin thi chi dispatch admin va get avatar

//tức nếu còn jwt thì thằng isAuthenticated vẫn luôn đúng
if (data) {
  var decoded = jwt.verify(data.token, 'YOUR_secret_key');
  if(decoded.isAdmin){
    store.dispatch({ type: LOGIN_SUCCESS_ADMIN });
  }
  else{
    // Update application state. User has token and is probably authenticated
    store.dispatch({ type: LOGIN_SUCCESS });
    store.dispatch({ type: GET_AVATAR });
  }

}

export default store;
