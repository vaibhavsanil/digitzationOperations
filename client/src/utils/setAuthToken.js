//import React, { useContext } from "react";
import axios from "axios";

// import AuthContext from "../context/auth/authContext";
// const authContext = useContext(AuthContext);

// console.info(authContext);

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
