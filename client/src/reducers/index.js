import { combineReducers } from 'redux';
import authReducer from './account/authReducers';
import errorReducer from './errorReducer';
import employeeReducer from './employeeReducer';
import notificationReducers from './notificationReducers';
import contractReducer from './contractReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  employees: employeeReducer,
  notifications: notificationReducers,
  contracts: contractReducer,
});
