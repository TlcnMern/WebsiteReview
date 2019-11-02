import axios from 'axios';
import {API_URL} from '../action/helper';
import { GET_COMMENT } from './type';

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
        .catch(error=>{
            console.log(error.response);
            return error.response.data;
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
//comment
export const addComment = (userId, credentials, postId, comment)=>dispatch=>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
    }
    const  body= JSON.stringify({commentBy:userId, postId: postId, content: comment});

    return axios.put(`${API_URL}/post/addComment`,body,config)
        .then(res=>{
            console.log(res.data)
            dispatch({
                type:GET_COMMENT,
                payload:res.data
            });
        })
        .catch(err=>{
            return err;
        });
}

export const deleteComment = (postId,userId, credentials, commentId)=>dispatch=>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
    }
    const  body= JSON.stringify({ postId: postId, commentId: commentId});
    return axios.put(`${API_URL}/post/deleteComment/`+userId,body,config)
        .then(res=>{
            console.log(res.data)
            dispatch({
                type:GET_COMMENT,
                payload:res.data
            });
        })
        .catch(err=>{
            return err;
        });
}

export const getComment = (postId)=>dispatch=>{
    const config={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }
    return axios.get(`${API_URL}/post/getComment/`+postId,config)
        .then(res=>{
            dispatch({
                type:GET_COMMENT,
                payload:res.data
            });
        })
        .catch(err=>{
            return err;
        });
}

export const addSubComment = (userId, credentials, commentId, content) =>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
    }
    const  body= JSON.stringify({userId:userId, commentId: commentId, content:content});
    return axios.put(`${API_URL}/post/addSubComment`,body,config)
        .then(res=>{
            return res.data;
        })
        .catch(err=>{
            return err;
        });
}

export const updateComment = (commentId,userId, credentials, content)=>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
    }
    const  body= JSON.stringify({ content: content, commentId: commentId});
    return axios.put(`${API_URL}/post/updateComment/`+userId,body,config)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            return err;
        });
}

//Rating
export const addRating = (userId, credentials, postId, point) =>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
            }
    }

    const  body= JSON.stringify({userId:userId, postId: postId, point: point});
    return axios.put(`${API_URL}/post/addRating`,body,config)
        .then(res=>{
            console.log(res.data);
            return true;
        })
        .catch(error=>{
            console.log(error.response);
            return error.response.data;
        });
}

export const updateRating = (userId, credentials, postId, point) =>{
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
            }
    }

    const  body= JSON.stringify({userId:userId, postId: postId, point: point});
    return axios.put(`${API_URL}/post/updateRatingOfUser`,body,config)
        .then(res=>{
            console.log(res.data)
            return true;
        })
        .catch(error=>{
            console.log(error.response);
            return error.response.data;
        });
}
  
//check user used to evaluation post yes or no
export const checkRatingAndShow = (userId, credentials, postId)=>{
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
            if(res.data.length>0){
                return res.data[0].point;
            }
            return null;
        })
        .catch(error=>{
            console.log(error);
            return error.response.data;
        });
}
