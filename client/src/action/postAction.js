import axios from 'axios';
import {API_URL} from '../action/helper';
import {CREATE_NEWPOST,GET_POSTLIST,GET_PHOTO} from '../action/type';

export const newPost=(userID,credentials,post)=>dispatch=>{
    const config={
        headers:{
            'Accept': 'application/json',
            'Authorization':'bearer '+credentials.t
        }
    }
    const body=post;
    axios.post(`${API_URL}/post/new/`+userID,body,config)
        .then(res=>
            dispatch({
                type:CREATE_NEWPOST
            }))
        .catch(err=>{
            console.log(err);
        });
}

export const GetNewFeeds=()=>dispatch=>{
    const config={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }
    axios.get(`${API_URL}/post/NewFeeds`,config)
        .then(res=>
            dispatch({
                type:GET_POSTLIST,
                payload:res.data
            }))
        .catch(err=>{
            console.log(err);
        });
};


export const getPhoto=(idpost)=>dispatch=>{
    axios.get(`${API_URL}/post/photo/`+idpost)
    .then(res=>
        dispatch({
            type:GET_PHOTO,
            payload:res.data.data
        }))
    .catch(err=>{
        console.log(err);
    });
}
export const geatPhoto=(idpost)=>{
    axios.get(`${API_URL}/post/photo/`+idpost)
    .then(function (response) {
        console.log(response.data.data);
      })
}
