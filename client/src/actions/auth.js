import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        console.log(res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        const errmessage = err.response.data.message;
        console.log(errmessage);
        //dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Register User
export const register = ({
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const user = {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        email,
        password
    };

    const body = JSON.stringify(user);

    try {
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errmessage = err.response.data.message;

        dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const user = {
        email,
        password
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(user);

    try {
        const res = await axios.post('/api/auth', body, config);
        console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errmessage = err.response.data.message;

        dispatch(setAlert(errmessage, 'danger'));

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
