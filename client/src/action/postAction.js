import axios from 'axios';
import { API_URL } from '../action/helper';
import { GET_COMMENT} from './type';

export const newPost = (userID, credentials, post) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'bearer ' + credentials.t
        }
    }

    const body = post;

    return axios.post(`${API_URL}/post/new/` + userID, body, config)
        .then(res => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
}

export const GetNewFeeds = () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/NewFeeds`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};

export const GetPostFeatured = () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/getPostFeatured`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};

export const calculateRaingtingEachPost = () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/calculateRaingtingEachPost`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};

//get detail post
export const getDetailPost = (postId) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/getDetailPost/`+postId, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};

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

//update subcomment
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

//Rating
export const addRating = (userId, credentials, postId, point) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    const body = JSON.stringify({ userId: userId, postId: postId, point: point });
    return axios.put(`${API_URL}/post/addRating`, body, config)
        .then(res => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
}


export const updateRating = (userId, credentials, postId, point) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    const body = JSON.stringify({ userId: userId, postId: postId, point: point });
    return axios.put(`${API_URL}/post/updateRatingOfUser`, body, config)
        .then(res => {
            console.log(res.data)
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
}

//check user used to evaluation post yes or no
export const checkRatingAndShow = (userId, credentials, postId) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ userId: userId, postId: postId });
    return axios.post(`${API_URL}/post/checkRatingAndShow`, body, config)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error.response.data;
        });
}