import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import { CUSTOMER } from '../../constants/index';

const Menu = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    // if (user.status_user === false) {
    //   logout();
    // }
    // console.log('From On Logout ', user);
    setuserState(user);
  }, [user]);
  const [userState, setuserState] = useState({});
  // https://stackoverflow.com/questions/18023493/bootstrap-dropdown-sub-menu-missing?rq=1
  // https://stackoverflow.com/questions/43370176/set-loading-state-before-and-after-an-action-in-a-react-class-component
  return (
    Object.keys(userState).length !== 0 && (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/dashboard" className="brand-link">
          {/* <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        className="brand-image img-circle elevation-3"
        style={{ opacity: "0.8" }}
      /> */}
          <span className="brand-text font-weight-light">
            Legislature{' '}
            {CUSTOMER === 'KLA' ? <span>Assembly</span> : <span>Council</span>}{' '}
            Ops
          </span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {/* <img
            src="https://lh3.googleusercontent.com/ogw/ADGmqu8Gnaw0ZDmdOBUl-LJ6V6QP2zvIzBTNzL2YzwGb=s32-c-mo"
            //src=""
            className="img-circle elevation-2"
            alt="User Image"
          /> */}
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {user ? user.name : 'Vaibhav'}
                {/* Vaibhav Sanil */}
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
              <li className="nav-item has-treeview menu-open">
                <Link to="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link ">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v2</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Start of Debates Menu */}

              <li className="nav-item has-treeview menu-open">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Debates Console
                    <i className="fas fa-angle-left right" />
                    <span className="badge badge-info right">6</span>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: 'block' }}>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                <Link to="/bookindex" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>ADD/EDIT BOOK</p>
                </Link>
              </li> */}
                  {userState.admin_status && (
                    <>
                      <li className="nav-item">
                        <Link to="/metadata" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Metadata</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/reports" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Reports</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/admin" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Administration</p>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              {/* End of Debates Menu */}
              {/* Committee Reports Start */}
              <li className="nav-item has-treeview">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>
                    Committe Reports
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 2</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 3</p>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Committee Reports End */}
              {/* Budget Speech */}
              <li className="nav-item has-treeview">
                <Link to="#" className="nav-link">
                  <i className="fas fa-rupee-sign nav-icon" />
                  <p>
                    Budget Speech
                    <i className="fas fa-angle-left right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />

                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 2</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 3</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Budget Speech End */}
              {/* Review Start */}
              <li className="nav-item has-treeview">
                <Link to="#" className="nav-link">
                  <i class="nav-icon fas fa-book-reader"></i>
                  <p>
                    Review
                    <i className="fas fa-angle-left right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 2</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Action 3</p>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Review End */}

              <li className="nav-header">MISCELLANEOUS</li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-file" />
                  <p>Documentation</p>
                </Link>
              </li>

              <li className="nav-header">Action</li>
              <li className="nav-item">
                <Link to="#" className="nav-link" onClick={onLogout}>
                  <i class="nav-icon fas fa-sign-out-alt text-danger"></i>
                  <p className="text">Logout</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i class="nav-icon fas fa-question-circle text-warning"></i>
                  <p>Contact Support</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    )
  );
};

export default Menu;
