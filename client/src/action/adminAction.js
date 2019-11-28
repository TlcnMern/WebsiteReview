import axios from 'axios';
import { API_URL } from '../config/helper';


// Quan ly bai viet
export const getPostList = (params) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    const body = {
        params: params
    }
    return axios.get(`${API_URL}/admin/getPostList`, body, config)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error.response.data;
        });
}

export const hidenPost = (postId) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    return axios.put(`${API_URL}/admin/hidenPost/` + postId, config)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return false;
        });
}

export const allowPost = (postId)  => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    return axios.put(`${API_URL}/admin/allowPost/` + postId, config)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return false;
        });
}


//Quan ly nguoi dung

export const getUserList = (params) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    const body = {
        params: params
    };
    return axios.get(`${API_URL}/admin/getUserList`, body, config)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error.response.data;
        });
}

