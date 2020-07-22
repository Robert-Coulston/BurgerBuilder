import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId: localId
  };
};

export const authFailure = (errorMessage) => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage: errorMessage,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authKeyInput = () => {
  return {
    type: actionTypes.AUTH_KEYINPUT,
  };
}

let timeOutCheck = null;
const checkAuthTimeout = (expirationInMilliseconds) => {
  return dispatch => {
    if (timeOutCheck !== null) {
      clearTimeout(timeOutCheck);
      timeOutCheck = null;
    }
    if (expirationInMilliseconds < 0) {
      dispatch(logout())
    } else {
      timeOutCheck = setTimeout(() => {dispatch(logout())},expirationInMilliseconds);
    }
  };
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADD0pzy5B_PatklKZqwixFqE3z0h8gLPI";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADD0pzy5B_PatklKZqwixFqE3z0h8gLPI";
    }

    axios
      .post(url, authData)
      .then((response) => {
        var t = new Date();
        t.setSeconds(t.getSeconds() + parseInt(response.data.expiresIn, 10));

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", t)
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000))
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("userId");
        dispatch(authFailure(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    authRedirectPath: path
  };
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logout);
      } else {
        dispatch(authSuccess(token,localStorage.getItem("userId")));
        const now = new Date();
        const expiredInMilliseconds = (expirationDate - now);
        dispatch(checkAuthTimeout(expiredInMilliseconds))
      }
    } else {
      dispatch(logout);
    }
  }

}
