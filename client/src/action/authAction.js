import axios from 'axios';
import {API_URL,auth} from './helper';
import { returnErrors } from './errorActions';

import {
    LOGIN_SUCCESS,    LOGIN_FAIL, LOGOUT_SUCCESS, CLEAR_ERRORS
} from './type';

  

export function login({ email, password }) {

  
  return function (dispatch) {
    axios.post(`${API_URL}/auth/signin`, { email, password })
    .then((response) => {
      // cookie.save('token', response.data.token, { path: '/' }); // path: / để có thể truy cập cookie trên tất cả các trang
      // cookie.save('user', response.data.user, { path: '/' });
      auth.authenticate(response.data);   //set data(token+user) to sessionStorge
      dispatch({         
        type: LOGIN_SUCCESS,
        payload: response.data 
      });
      // window.location.href = `${CLIENT_ROOT_URL}`
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
  };
}

export const logout=() =>dispatch=>{
  dispatch({
    type: LOGOUT_SUCCESS
  });
  dispatch({
    type: CLEAR_ERRORS
  });
  // window.location.href = `${CLIENT_ROOT_URL}`;
};