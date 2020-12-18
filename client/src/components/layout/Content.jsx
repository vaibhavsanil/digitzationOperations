import React, { useContext, useEffect } from "react";

// Import Context
import AuthContext from "../../context/auth/authContext";

// Import Components

import ContentHeader from "../dashboard/ContentHeader-component";
import TableDashboard from "../dashboard/TableDashboard-component";
const Content = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disale-next-line
  }, []);
  return (
    <div className="content-wrapper">
      <ContentHeader />
      <TableDashboard />
    </div>
  );
};

export default Content;
