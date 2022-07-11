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

export default (state, action) => {
  switch (action.type) {
    //Admin Actions
    case GET_ADMIN_USERS:
      return {
        ...state,
        adminUsers: [...action.payload],
      };

    case DELETE_NEW_ADMIN_USERS:
      return {
        ...state,
        adminUsers: state.adminUsers.filter(
          (users) => users._id !== action.payload
        ),
      };

    case CLEAR_ADMIN_USERS:
      return {
        ...state,
        adminUsers: [],
      };

    case ADD_USER_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case REMOVE_USER_ERROR:
      return {
        ...state,
        errors: {},
      };
    case REGISTER_ADMIN_SUCCESS:
      return {
        ...state,
      };

    case GET_USER_LOGS:
      return {
        ...state,
        logData: [...action.payload],
      };

    case REMOVE_USER_LOGS:
      return {
        ...state,
        logData: [],
      };

    default:
      return state;
  }
};
