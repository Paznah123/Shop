import { AsyncStorage } from 'react-native';
import { SIGNUP_URL, LOGIN_URL } from '../../consts/dbRefs';

export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

/* ========================================== */

const identifyError = errId => {
  switch(errId) {
      case 'EMAIL_NOT_FOUND':
          return 'This email could not be found!';
      case 'INVALID_PASSWORD':
          return 'This password is not valid!';
      case 'EMAIL_EXISTS':
          return 'This email exists!';
  }
};

/* ========================================== */

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signup = (email, password) => {
  return connect(SIGNUP_URL, email, password);
};

export const login = (email, password) => {
  return connect(LOGIN_URL, email, password);
};

/* ========================================== */

export const connect = (url, email, password) => {
  return async dispatch => {
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errResData = await response.json();
      const errId = errResData.error.message;
      throw new Error(identifyError(errId));
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

/* ========================================== */

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

/* ========================================== */

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) clearTimeout(timer);
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

/* ========================================== */

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
