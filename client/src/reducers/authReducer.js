import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../action/type';

  const initialState = {
    isAuthenticated: null,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          isAuthenticated:true,
          ...action.payload,
        };
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        sessionStorage.removeItem('jwt')
        return {
          ...state,
          token: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  }
  