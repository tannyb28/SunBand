import { LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS } from "../actions/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
const user = AsyncStorage.getItem("user");
const uid = AsyncStorage.getItem("uid");
const initialState = user
  ? { isLoggedIn: true, user, uid }
  : { isLoggedIn: false, user: null, uid: null };
export default auth = (state = initialState, action) => {
  const { type, payload } = action;
switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        uid: payload.uid,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        uid: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        uid: payload.uid,
      };
    default:
      return state;
  }
};