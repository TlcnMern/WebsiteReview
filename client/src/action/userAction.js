import axios from 'axios';
import {API_URL} from './helper';
import { returnErrors } from './errorActions';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FETCH_USER,ERROR_RESPONSE} from './type';


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

//get info user
export const fetch=(uid,credentials)=>{
  const config={
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + credentials.t
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

//update info user
export const update = (userID, credentials, user) => {
  const config={
    headers:{
        'Accept': 'application/json',
        'Authorization':'bearer '+credentials.t
    }
  }
  const body=user;
  return axios.put(`${API_URL}/users/editProfile/`+userID,body,config)
  .then(res=>{
      return true;
  })
  .catch(err=>{
      return err;
  });
}
