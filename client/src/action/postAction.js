import axios from 'axios';
import { API_URL } from '../config/helper';

export const newPost = (userId, credentials, post) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    const body = post;

    return axios.post(`${API_URL}/post/new/` + userId, body, config)
        .then(res => {
            console.log(res.data)
            return true;
        })
        .catch(error => {
            console.log(error)
            console.log(error.response);
            return error.response.data;
        });
}

export const GetNewFeeds = (userId) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/newFeeds/`+userId, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};

export const getPostPaginate = (page) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/getPostPaginate/`+page, config)
        .then(res => {
            console.log(res.data)
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

export const getTopListPostFollowTheme = (theme) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/getTopListPostFollowTheme/`+theme, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};


export const searchPost = (query) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/post/searchPost?search=`+query.productReview, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};

export const sortPost = (params) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body={
        params:params
    }
    return axios.get(`${API_URL}/post/sortPost`,body, config)
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

export const likePost = (postId,userId,credentials) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    var body={postId}
    return axios.put(`${API_URL}/post/likePost/`+userId, body, config)
        .then(res => {
            return true
        })
        .catch(err => {
            return false;
        });
}

export const unLikePost = (postId,userId,credentials)  => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }

    var body={postId}
    return axios.put(`${API_URL}/post/unLikePost/`+userId, body, config)
        .then(res => {
            return true
        })
        .catch(err => {
            return false;
        });
}

export const checkLikePost = (postId,userId)  => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    var params={postId:postId,userId:userId}
    var body={params:params}

    return axios.get(`${API_URL}/post/checkLikePost`, body, config)
        .then(res => {
            return true
        })
        .catch(err => {
            return false;
        });
}