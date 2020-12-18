import React, { Fragment } from "react";

import BreadCrumbsDashboard from "./BreadCrumbs-component";

function ContentHeader() {
  return (
    <Fragment>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <BreadCrumbsDashboard />
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header END */}
    </Fragment>
  );
}

export default ContentHeader;
