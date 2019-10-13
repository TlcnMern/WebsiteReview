import axios from 'axios';
import {API_URL} from '../action/helper';

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
            console.log('okcmm');
            return true;
        })
        .catch(error=>{
            console.log('okdmm');
            return false;
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


export const getPhoto=(idpost)=>{
    return axios.get(`${API_URL}/post/photo/`+idpost)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
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

    return axios.put(`${API_URL}/post/addComment`,body,config)
        .then(res=>{
            return res.data;
        })
        .catch(err=>{
            return err;
        });
  }

export const addRating = (userId, credentials, postId, point) =>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
            }
    }

    const  body= JSON.stringify({userId:userId, postId: postId, point: point});
    console.log(body);
    return axios.put(`${API_URL}/post/addRating`,body,config)
        .then(res=>{
            return res.data;
        })
        .catch(error=>{
            console.log(error.response);
            return error.response.data;
        });
}
  

export const checkRatingAndShow = (userId, credentials, postId) =>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
            }
    }

    const  body= JSON.stringify({userId:userId, postId: postId});
    return axios.post(`${API_URL}/post/checkRatingAndShow`,body,config)
        .then(res=>{
            return res.data;
        })
        .catch(error=>{
            console.log(error.response);
            return error.response.data;
        });
}
