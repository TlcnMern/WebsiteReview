import axios from 'axios';
import {API_URL, CLIENT_ROOT_URL} from './index';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,    AUTH_ERROR,    LOGIN_SUCCESS,    LOGIN_FAIL,    LOGOUT_SUCCESS,    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_ERROR,
    CLEAR_ERROR,
    USER_LOADING
} from './type';


  
// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post(`${API_URL}/auth/signin`, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      }),
      // window.location.href = `${CLIENT_ROOT_URL}`
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};