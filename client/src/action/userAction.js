import axios from 'axios';
import {API_URL} from './helper';
import { returnErrors } from './errorActions';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FETCH_USER,ERROR_RESPONSE,FOLLOW,FOLLOWED} from './type';


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
export const fetch=(uid)=>{
  const config={
    'Accept': 'application/json',
    'Content-Type': 'application/json',
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

//check xem đã theo dõi thằng đó hay chưa để bật cờ isFollow(true thì bỏ theo dõi, false thì theo dõi)
export const checkFollow=(userID,credentials,userIDFollow) =>dispatch=> {
  const config={
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
  }
  const body={userIDFollow};
  axios.post(`${API_URL}/users/checkFollow/${userID}`,body,config)
    .then(res=>{
      //không có trong danh sách theo dõi => cho theo dõi
      if(res.data){
        dispatch({
          type:FOLLOW   //tức isFollow=false
        })
      }
      //có trong danh sách theo dõi => cho bỏ theo dõi
      else{
        dispatch({
          type:FOLLOWED   //tức isFollow=true
        })
      }
    })
    .catch(err=>{dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    )})
}



export const follow = (userID, credentials, followId) =>dispatch=> {
  const config={
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }
  const  body= JSON.stringify({userId:userID, followId: followId});
  axios.put(`${API_URL}/users/follow`,body,config)
  .then(res=>dispatch({
    type:FOLLOW   //tức isFollow=true
  }))
  .catch(err=>{dispatch(
    returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
  )})
}

export const unFollow = (userID, credentials, followId) =>dispatch=> {
  const config={
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }
  const  body= JSON.stringify({userID:userID, unFollowId: followId});
  console.log(body);
  axios.put(`${API_URL}/users/unFollow`,body,config)
  .then(res=>dispatch({
    type:FOLLOWED //tức isFollow=false
  }))
  .catch(err=>{dispatch(
    returnErrors(err.response.data, err.response.status, 'UNFOLLOW_FAIL')
  )})
}