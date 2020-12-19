import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  //console.log("Is Authenticated", isAuthenticated);
  //console.log("loading", loading);
  return (
    <Route
      {...rest}
      render={(props) =>
        //!isAuthenticated && !loading ? (
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
