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

import {
  REACT_BACKEND_NODE_KLA_DEV,
  REACT_BACKEND_NODE_KLA_PROD,
  REACT_BACKEND_NODE_KLC_DEV,
  REACT_BACKEND_NODE_KLC_PROD,
  CUSTOMER,
  APP_ENV,
} from "../../constants/index";

const fetch_url_kla =
  APP_ENV === "DEV" ? REACT_BACKEND_NODE_KLA_DEV : REACT_BACKEND_NODE_KLA_PROD;
const fetch_url_klc =
  APP_ENV === "DEV" ? REACT_BACKEND_NODE_KLC_DEV : REACT_BACKEND_NODE_KLC_PROD;

const fetch_url = CUSTOMER === "KLA" ? fetch_url_kla : fetch_url_klc;
const axiosInstance = axios.create({
  baseURL: fetch_url,
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("token"),
  },
});

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
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // } else {
    //   console.info("[DEBUG] from load user action the token dont exist");
    // }

    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axiosInstance.get("/api/users/current", config);

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
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axiosInstance.post(
        "/api/users/register",
        formData,
        config
      );

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
      const res = await axiosInstance.post("/api/users/login", formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //loadUser();
      return res.data;
    } catch (err) {
      if (Object.keys(err).length !== 0) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data,
        });
      }
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
