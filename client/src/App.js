import React, { Fragment, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';

import Login from './components/auth/Login-component';
import Register from './components/auth/Register-Component';
import BookIndex from './components/book/BookIndex';
import MetadataIndex from './components/metadata/MetadataIndex.componenet';
import { SearchTableNew } from './utils/SearchTableNew.component';
import AdminPage from './components/Admin/AdminLandingPage';

//Importing Private Route
import PrivateRoute from './components/routing/PrivateRoute';
import CheckLogin from './components/routing/CheckLogin';

// Import Set Auth Token
import setAuthToken from './utils/setAuthToken';

// Import Context API State

import BookState from './context/book/BookState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import MetadataState from './context/metadata/MetadataState';
import AdminState from './context/admin/AdminState';

// Set Auth Context

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AdminState>
      <AlertState>
        <AuthState>
          <MetadataState>
            <BookState>
              <Router>
                <Fragment>
                  <Switch>
                    {/* Check if this rendein can be conditional */}
                    <CheckLogin path="/login" component={Login} />
                    {/* <Route exact path="/login" component={Login} /> */}
                  </Switch>
                  {/*  <Switch>
                  <Route exact path="/register" component={Register} />
                </Switch> */}
                  <div className="wrapper">
                    <PrivateRoute
                      path={[
                        '/dashboard',
                        '/bookindex/:id',

                        '/metadata',
                        '/tabledemo',
                        '/admin',
                        '/reports',
                      ]}
                      component={Header}
                    />
                    <PrivateRoute
                      path={[
                        '/dashboard',
                        '/bookindex/:id',

                        '/metadata',
                        '/tabledemo',
                        '/admin',
                        '/reports',
                      ]}
                      component={Menu}
                    />

                    {/* <Header />
                  <Menu /> */}
                    <Switch>
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Content}
                      />

                      <PrivateRoute
                        exact
                        path="/bookindex/:id"
                        component={BookIndex}
                      />

                      <PrivateRoute
                        exact
                        path="/bookindex"
                        component={BookIndex}
                      />

                      <PrivateRoute
                        exact
                        path="/metadata"
                        component={MetadataIndex}
                      />
                      <PrivateRoute exact path="/admin" component={AdminPage} />
                      <PrivateRoute
                        exact
                        path="/reports"
                        component={MetadataIndex}
                      />

                      <Route
                        exact
                        path="/tabledemo"
                        component={SearchTableNew}
                      />
                    </Switch>
                    <PrivateRoute
                      path={[
                        '/dashboard',
                        '/bookindex/:id',

                        '/metadata',
                        '/tabledemo',
                        '/admin',
                        '/reports',
                      ]}
                      component={Footer}
                    />
                    {/* <Footer /> */}
                  </div>
                </Fragment>
              </Router>
            </BookState>
          </MetadataState>
        </AuthState>
      </AlertState>
    </AdminState>
  );
}

export default App;
