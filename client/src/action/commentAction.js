import axios from 'axios';
import { API_URL } from '../config/helper';
import { GET_COMMENT} from '../config/type';

//comment
export const checkAuthorizedComment = (jwt, userID, commentID) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt.t
        }
    }
    const body = JSON.stringify({ commentID: commentID });
    return axios.post(`${API_URL}/post/checkAuthorizedComment/` + userID, body, config)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return false;
        })
}

export const checkAuthorizedSubComment = (jwt, userID, commentId, subCommentId) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt.t
        }
    }
    const body = JSON.stringify({ commentId: commentId,subCommentId:subCommentId });
    return axios.post(`${API_URL}/post/checkAuthorizedSubComment/` + userID, body, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const addComment = (userId, credentials, postId, comment) => dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ commentBy: userId, postId: postId, content: comment });

    return axios.put(`${API_URL}/post/addComment`, body, config)
        .then(res => {
            dispatch({
                type: GET_COMMENT,
                payload: res.data
            });
        })
        .catch(err => {
            return err;
        });
}

export const deleteComment = (postId, userId, credentials, commentId) => dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ postId: postId, commentId: commentId });
    return axios.put(`${API_URL}/post/deleteComment/` + userId, body, config)
        .then(res => {
            dispatch({
                type: GET_COMMENT,
                payload: res.data
            });
        })
        .catch(err => {
            return err;
        });
}

export const deleteSubComment = (commentId, userId, credentials, subCommentId) => {
    const body = {commentId: commentId, subCommentId: subCommentId }
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        data:body
    }


    console.log(body)
    return axios.delete(`${API_URL}/post/deleteSubComment/` + userId,config )
        .then(res => {
            console.log(res.data)
            return res.data;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
}

export const getComment = (postId) => dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/getComment/` + postId, config)
        .then(res => {
            dispatch({
                type: GET_COMMENT,
                payload: res.data
            });
        })
        .catch(err => {
            return err;
        });
}

export const addSubComment = (userId, credentials, commentId, content) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ userId: userId, commentId: commentId, content: content });
    return axios.put(`${API_URL}/post/addSubComment`, body, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}

export const updateComment = (commentId, userId, credentials, content) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ content: content, commentId: commentId });
    return axios.put(`${API_URL}/post/updateComment/` + userId, body, config)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            return err;
        });
}

export const updateSubComment = (subCommentId, userId, credentials, content) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ content: content , subCommentId:subCommentId});
    return axios.put(`${API_URL}/post/updateSubComment/` + userId, body, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}

export const likeComment = (commentId,userId,credentials) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    var body={commentId}
    return axios.put(`${API_URL}/post/likeComment/`+userId, body, config)
        .then(res => {
            return true
        })
        .catch(err => {
            return false;
        });
}

export const unLikeComment = (commentId,userId,credentials)  => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    var body={commentId}
    return axios.put(`${API_URL}/post/unLikeComment/`+userId, body, config)
        .then(res => {
            return true
        })
        .catch(err => {
            return false;
        });
}

export const checkLike = (commentId,userId)  => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    var params={commentId:commentId,userId:userId}
    var body={params:params}

    return axios.get(`${API_URL}/post/checkLike`, body, config)
        .then(res => {
            return true
        })
        .catch(err => {
            return false;
        });
}
