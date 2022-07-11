import React, { useReducer } from 'react';

import axios from 'axios';

import AdminContext from './adminContext';
import AdminReducer from './adminReducer';

import setAuthToken from '../../utils/setAuthToken';

import {
  GET_ADMIN_USERS,
  POST_NEW_ADMIN_USERS,
  DELETE_NEW_ADMIN_USERS,
  ADD_USER_ERROR,
  REMOVE_USER_ERROR,
  CLEAR_ADMIN_USERS,
  REGISTER_ADMIN_SUCCESS,
  GET_USER_LOGS,
  REMOVE_USER_LOGS,
} from '../types';

const AdminState = (props) => {
  const initialState = {
    adminUsers: [],
    currentUser: {},
    logData: [],
    errors: {},
  };

  const [state, dispatch] = useReducer(AdminReducer, initialState);

  // Auth Actions

  //Load User for Admin roles

  const getUsersAdmin = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get('api/users/getusers');

      dispatch({ type: GET_ADMIN_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: ADD_USER_ERROR, payload: err.response.data });
    }
  };

  //Register User

  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users/register', formData, config);

      // dispatch({
      //   type: REGISTER_ADMIN_SUCCESS,
      //   payload: res.data,
      // });
      getUsersAdmin();
      return res.data;
    } catch (err) {
      console.info(`From Error log ${JSON.stringify(err.response.data)}`);
      return err.response.data;
      // dispatch({
      //   type: ADD_USER_ERROR,
      //   payload: err.response.data,
      // });
    }
  };

  // Delete User

  const deleteUser = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.delete(`/api/users/${id}`, config);
      getUsersAdmin();
      return res;
    } catch (err) {
      dispatch({
        type: ADD_USER_ERROR,
        payload: err.response.data,
      });
    }
  };

  const getUsersLogs = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get('api/users/logs');

      dispatch({ type: GET_USER_LOGS, payload: res.data });
    } catch (err) {
      dispatch({ type: ADD_USER_ERROR, payload: err.response.data });
    }
  };

  const removeUsersLogs = async () => {
    dispatch({
      type: REMOVE_USER_LOGS,
    });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: REMOVE_USER_ERROR });

  return (
    <AdminContext.Provider
      value={{
        adminUsers: state.adminUsers,
        logData: state.logData,
        currentUser: state.currentUser,
        errors: state.errors,

        getUsersAdmin,
        registerUser,
        deleteUser,
        clearErrors,
        getUsersLogs,
        removeUsersLogs,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
