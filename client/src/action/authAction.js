import axios from 'axios';
import { API_URL, auth } from '../config/helper';
import { returnErrors } from './errorActions';

import {
  LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, CLEAR_ERRORS, CLEAN_PROFILE, GET_AVATAR, LOGIN_SUCCESS_ADMIN
} from '../config/type';


export function login({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/signin`, { email, password })
      .then((response) => {
        auth.authenticate(response.data)
        if (response.data.isAdmin) {
          dispatch({
            type: LOGIN_SUCCESS_ADMIN
          });
        }
        dispatch({
          type: LOGIN_SUCCESS
        });
        dispatch({
          type: GET_AVATAR
        });
      })
      .catch(err => {
        console.log(err)
        dispatch(
          returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
        );
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };
}

export const loginSocial = (accessToken) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = {
    access_token: accessToken
  }
  axios.post(`${API_URL}/auth/oauth/google`, body, config)
    .then((response) => {
      auth.authenticate(response.data);
      dispatch({
        type: LOGIN_SUCCESS
      });
      dispatch({
        type: GET_AVATAR
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
}

export const loginWithFacebook = (accessToken) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = {
    access_token: accessToken
  }
  axios.post(`${API_URL}/auth/oauth/facebook`, body, config)
    .then((response) => {
      auth.authenticate(response.data);
      dispatch({
        type: LOGIN_SUCCESS
      });
      dispatch({
        type: GET_AVATAR
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
  dispatch({
    type: CLEAN_PROFILE
  });
  dispatch({
    type: CLEAR_ERRORS
  });
  // window.location.href = `${CLIENT_ROOT_URL}`;
};