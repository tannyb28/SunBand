import { LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS } from "./type";
import AuthService from "../services/authService";
export const login = (user) => (dispatch) => {
  return AuthService.logIn(user).then(
    (response) => {
      console.log(response);
      if (response.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response.user, uid: response.uid },
        });
        Promise.resolve();
        return response;
      }
    },
    (error) => {
      const message = error.toString();
      Promise.reject();
      return message;
    }
  );
};
export const logout = () => (dispatch) => {
  return AuthService.logOut().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: LOGOUT,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const signup = (user) => (dispatch) => {
  return AuthService.signUp(user).then(
    (response) => {
      console.log(response);
      if (response.status === "success") {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: { user: response.user, uid: response.uid },
        });
        Promise.resolve();
        return response;
      }
    },
    (error) => {
      const message = error.toString();
      Promise.reject();
      return message;
    }
  );
};