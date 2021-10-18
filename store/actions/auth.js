import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId, expirationDate) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationDate));
    dispatch({ type: AUTHENTICATE, token: token, userId: userId });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    };
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3E0gf4kSrR-1VfEPE1vrnXwfgU2ucnpo',
      config
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'something wrong occured';

      if (errorId === 'EMAIL_EXISTS') {
        message = ' The email you entered is alredy exists';
      } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        message = 'Too many attempts happened try again later';
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    };
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3E0gf4kSrR-1VfEPE1vrnXwfgU2ucnpo',
      config
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Passwored you have entered is not valid!!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    dispatch({
      type: LOGOUT
    });
  };
};

const clearLogoutTimer = () => {
  if (timer) clearTimeout(timer);
};

const setLogoutTimer = (expirationDate) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString()
    })
  );
};
