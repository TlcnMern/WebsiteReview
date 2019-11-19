import axios from 'axios';
import { API_URL } from '../config/helper';

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
    return axios.put(`${API_URL}/rating/addRating`, body, config)
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
    return axios.put(`${API_URL}/rating/updateRatingOfUser`, body, config)
        .then(res => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
}

export const checkRatingAndShow = (userId, credentials, postId) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const body = JSON.stringify({ userId: userId, postId: postId });
    return axios.post(`${API_URL}/rating/checkRatingAndShow`, body, config)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error.response.data;
        });
}

export const calculateRaingtingEachPost = () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`${API_URL}/rating/calculateRaingtingEachPost`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
};