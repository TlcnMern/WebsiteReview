import axios from 'axios';
import {API_URL} from '../action/helper';
import {GET_PHOTO} from '../action/type';

export const newPost=(userID,credentials,post)=>{
    const config={
        headers:{
            'Accept': 'application/json',
            'Authorization':'bearer '+credentials.t
        }
    }
    const body=post;
    return axios.post(`${API_URL}/post/new/`+userID,body,config)
        .then(res=>{
            return true;
        })
        .catch(err=>{
            return err;
        });
}

export const GetNewFeeds=()=>{
    const config={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }
    return axios.get(`${API_URL}/post/NewFeeds`,config)
        .then(res=>{
            return res.data;
        })
        .catch(err=>{
            return err;
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

export const addComment = (userId, credentials, postId, comment) =>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
    }
    const  body= JSON.stringify({userId:userId, postId: postId, comment: comment});

    return axios.put(`${API_URL}/post/addComment/`,body,config)
        .then(res=>{
            return res.data;
            }
        )
        .catch(err=>{
            return err;
        });
  }
  
