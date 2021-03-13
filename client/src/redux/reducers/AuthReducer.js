const jwt = require('jsonwebtoken');

const {
  ACCESS_REQUEST,
  ACCESS_APPROVED,
  ACCESS_DENIED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILED,
} = require('../actions/AuthActionTypes');

export const validToken = (token) => {
  let decoded = jwt.decode(token);
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

const initState = {
  currentUser: localStorage.getItem('USERTOKEN')
    ? validToken(localStorage.getItem('USERTOKEN'))
    : null,
  token: localStorage.getItem('USERTOKEN')
    ? localStorage.getItem('USERTOKEN')
    : null,
  username: localStorage.getItem('USERTOKEN')
    ? localStorage.getItem('USERNAME')
    : null,
  userId: localStorage.getItem('USERTOKEN')
    ? localStorage.getItem('USERID')
    : null,
  role: localStorage.getItem('USERTOKEN')
    ? localStorage.getItem('USERROLE')
    : null,
  error: '',
  loading: false,
  isAuthenticated: localStorage.getItem('USERTOKEN') ? true : false,
};

const authenticationReducer = function (state = initState, action) {
  switch (action.type) {
    case ACCESS_REQUEST:
    case REGISTER_REQUEST:
    case SIGNOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case ACCESS_DENIED:
    case REGISTER_FAILED:
    case SIGNOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentUser: null,
        isAuthenticated: false,
      };
    case REGISTER_SUCCESS:
    case ACCESS_APPROVED:
      return {
        ...state,
        loading: false,
        userId: action.payload.userId,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticated: true,
      };
    case SIGNOUT_SUCCESS:
      localStorage.removeItem('USERTOKEN');
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('USERID');
      localStorage.removeItem('USERROLE');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        currentUser: null,
        token: '',
        username: '',
        userId: '',
        role: '',
      };
    default:
      return {
        ...state,
      };
  }
};

export default authenticationReducer;
