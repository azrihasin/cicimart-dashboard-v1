import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    INPROGRESS,
    LOGOUT,
    ACCOUNT_DELETED
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    requestInProgress: false
  };
  
  function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch  (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case REGISTER_SUCCESS:
      case INPROGRESS:
        return{
          requestInProgress:true
        }
      case LOGIN_SUCCESS:
        localStorage.setItem('token',payload.token)
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          user: payload,
          requestInProgress:false
        };
      case LOGIN_FAIL:
        return{
          requestInProgress:false
        }
      case ACCOUNT_DELETED:
      case AUTH_ERROR:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  }
  
  export default authReducer;