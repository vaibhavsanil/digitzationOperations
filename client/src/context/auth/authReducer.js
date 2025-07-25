import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      setAuthToken(localStorage.getItem("token"));
      // console.info(
      //   "[DEBUG Auth Reducer Check Token]",
      //   localStorage.getItem("token")
      // );
      // console.info(
      //   "[DEBUG Auth Reducer jwt Check Token]",
      //   localStorage.getItem("jwtToken")
      // );

      return {
        ...state,
        ...action.payload, //Why action.payload has been passed token key is in payload
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      //console.info("[DEBUG] Auth Reducer ", typeof action.payload);
      setAuthToken("");
      let errorValue = action.payload ? action.payload : {};
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: errorValue,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
