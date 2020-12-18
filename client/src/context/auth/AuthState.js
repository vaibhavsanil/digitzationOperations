import React, { useReducer } from "react";

import axios from "axios";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
    loading: false,
    errors: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Auth Actions

  //Load User

  const loadUser = async () => {
    //@todo - load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      console.info("[DEBUG] from load user action the token dont exist");
    }

    try {
      const res = await axios.get("/api/users/current");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
    }
  };

  //Register User

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users/register", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users/login", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //loadUser();
    } catch (err) {
      // console.info("[DEBUG Login] ", err.response);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
        //payload: err.response.data.msg,
      });
    }
  };

  //Logout

  const logout = () => dispatch({ type: LOGOUT });

  //Clear Errors
  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
        register,
        clearErrors,
        login,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
