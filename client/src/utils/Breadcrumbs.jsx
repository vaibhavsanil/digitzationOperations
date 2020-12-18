import React, { useContext } from "react";
import AuthContext from "../context/auth/authContext";

const BreadCrumbsDashboard = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  // const breadcrumbItem = (

  // )
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Welcome {user ? user.name : ""} </h1>
          </div>
          {/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">
                <a href="#">Dashboard V1</a>{" "}
              </li>
            </ol>
          </div>
          {/* /.col */}
        </div>
      </div>
      {/* /.container-fluid */}
    </div>
  );
};

export default BreadCrumbsDashboard;
