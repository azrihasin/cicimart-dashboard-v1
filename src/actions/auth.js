
import api from '../utils/api.js';
import loginApi from '../utils/loginApi.js';
import { setAlert } from './alert';
import {
  AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, INPROGRESS
} from './types';

// Load User
export const loadUser = () => async dispatch => {

  var session_url = '/employee/on-start';

  try {

    const res = await api.get(session_url);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const inProgress = ()  => async dispatch => {
  dispatch({
    type: INPROGRESS
  });
}

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  var session_url = '/employee/login';
  
  var basicAuth = 'Basic ' + btoa(email + ':' + password);


  try {
    const res = await loginApi.post(session_url, {}, {
      headers: { 'Authorization': basicAuth }
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });