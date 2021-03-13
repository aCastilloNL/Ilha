import axios from 'axios';

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
} = require('./AuthActionTypes');

//Register
const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      user,
    },
  };
};

const registerFail = (error) => {
  return {
    type: REGISTER_FAILED,
    payload: error,
  };
};

export const signUp = (user, history) => {
  return function (dispatch) {
    dispatch(registerRequest());
    axios({
      method: 'post',
      url: '/signUp',
      data: user,
    })
      .then((res) => {
        const { data } = res.data;
        dispatch(registerSuccess(data));
        window.alert('User succesfully registered! Please sign in.');
        history.push('/');
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(registerFail(window.alert(message)));
      });
  };
};

//Access
const accessRequest = () => {
  return {
    type: ACCESS_REQUEST,
  };
};

export const accessApproved = (token, username, userId, role) => {
  return {
    type: ACCESS_APPROVED,
    payload: {
      token,
      username,
      userId,
      role,
    },
  };
};

const accessFailed = (error) => {
  return {
    type: ACCESS_DENIED,
    payload: error,
  };
};

export const signIn = (payload, history) => {
  return function (dispatch) {
    dispatch(accessRequest);
    axios({
      method: 'post',
      url: '/signIn',
      data: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('USERTOKEN')}`,
      },
    })
      .then((response) => {
        const { token, username, userId, role } = response.data;
        localStorage.setItem('USERTOKEN', token);
        localStorage.setItem('USERNAME', username);
        localStorage.setItem('USERID', userId);
        localStorage.setItem('USERROLE', role);
        dispatch(accessApproved(token, username, userId, role));
        history.push('/Dashboard');
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(accessFailed(window.alert(message)));
        return Promise.reject();
      });
  };
};

//Sign-out
export const signoutRequest = () => {
  return {
    type: SIGNOUT_REQUEST,
  };
};

export const signoutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};

export const signoutFailed = () => {
  return {
    type: SIGNOUT_FAILED,
  };
};

export const signOut = function (history) {
  return function (dispatch) {
    dispatch(signoutRequest());
    localStorage.clear();
    history.push('/');
    if (localStorage.getItem('USERTOKEN')) {
      dispatch(signoutFailed());
    } else {
      dispatch(signoutSuccess());
    }
  };
};
