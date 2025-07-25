import React from 'react';

import Breadcrumbs from '../../utils/Breadcrumbs';

import AddUserTable from './AddUsers/AddUser';
import AddUserLogs from './UserLogs/UserLogs--component';

function AdminLandingPage() {
  return (
    <div className="content-wrapper">
      <Breadcrumbs />
      <AddUserTable />
      <AddUserLogs />
    </div>
  );
}

export default AdminLandingPage;
