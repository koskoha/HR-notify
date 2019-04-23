import { combineReducers } from 'redux';
import authReducer from './account/authReducers';
import errorReducer from './account/errorReducer';
import employeeReducer from './employeeReducer';
import notificationReducers from './notificationReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  employees: employeeReducer,
  notifications: notificationReducers,
});
