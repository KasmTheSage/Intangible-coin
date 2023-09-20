import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    SAVE_CONTACT,
    FIND_PROFILE,
    TRANSFER_COIN
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        if(!edit){
            history.push('/profile');
        }
    }
    catch(err){
        const errmessage = err.response.data.message;

        dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Save contact
export const saveContact = (formData) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile/contacts', formData, config);

        dispatch({
            type: SAVE_CONTACT,
            payload: res.data
        });

        dispatch(setAlert('Contact saved', 'success'));
    }
    catch(err){
        const errmessage = err.response.data.message;

        dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Find profile by user email
export const findProfile = (email) => async dispatch => {
    try{
        const res = await axios.get(`/api/profile/user/${email}`);

        dispatch({
            type: FIND_PROFILE,
            payload: res.data
        });
    }
    catch(err){
        const errmessage = err.response.data.message;

        dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Transfer coin
export const transferCoin = ( id, type, amount, reason, anonymous ) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const input = {
            type,
            amount,
            reason,
            anonymous
        };

        const body = JSON.stringify(input);

        const res = await axios.post(`api/profile/transfer/${id}`, body, config);

        dispatch({
            type: TRANSFER_COIN,
            payload: res.data
        });

        dispatch(setAlert('Coin transferred', 'success'));
    }
    catch(err){
        const errmessage = err.response.data.message;

        console.log(errmessage);

        dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}