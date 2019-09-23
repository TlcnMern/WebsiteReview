import axios from 'axios';
import {API_URL, CLIENT_ROOT_URL} from './index';
import { returnErrors } from './errorActions';
import cookie from 'react-cookies';

import {
    USER_LOADED,    AUTH_ERROR,    LOGIN_SUCCESS,    LOGIN_FAIL,    LOGOUT_SUCCESS,    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FETCH_USER,ERROR_RESPONSE
} from './type';


export const RegisterAction =({name,email,password})=>dispatch=>{
    // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body=JSON.stringify({name,email,password});
  axios 
    .post(`${API_URL}/users`,body,config)
    .then(res=>
      dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
      }))
    .catch(err=>{
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};


export const fetch=(uid)=>{
  const config={
      Authorization:cookie.load('token')
  };
  console.log(uid);
  return function (dispatch) {
    axios.get(`${API_URL}/users/${uid}`,config)
    .then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.user,
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_RESPONSE
      });
    });
  }
};