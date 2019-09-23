import axios from 'axios';
import cookie from 'react-cookies';
import {API_URL, CLIENT_ROOT_URL} from './index';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,    AUTH_ERROR,    LOGIN_SUCCESS,    LOGIN_FAIL,    LOGOUT_SUCCESS,    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_ERROR,
    CLEAR_ERROR,
    USER_LOADING
} from './type';

  

export function login({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/signin`, { email, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' }); // path: / để có thể truy cập cookie trên tất cả các trang
      cookie.save('user', response.data.user, { path: '/' });

      dispatch({         
        type: LOGIN_SUCCESS,
        payload: response.data 
      });
      window.location.href = `${CLIENT_ROOT_URL}`
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
  };
}