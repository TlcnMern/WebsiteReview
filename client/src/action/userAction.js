import axios from 'axios';
import {API_URL, auth} from './helper';
import { returnErrors } from './errorActions';

import {
    LOGOUT_SUCCESS,    REGISTER_SUCCESS,
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

//get info user
export const fetch=(uid)=>{
  const config={
      Authorization:auth.isAuthenticated()
  };
  return function (dispatch) {
    axios.get(`${API_URL}/users/${uid}`,config)
    .then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.userInfo,
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_RESPONSE
      });
    });
  }
};