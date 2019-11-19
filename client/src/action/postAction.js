import axios from 'axios';
import { API_URL } from '../config/helper';

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
    return axios.get(`${API_URL}/post/searchPost?search=`+query.title, config)
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
