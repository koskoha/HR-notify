import axios from 'axios';
import { UPDATE_EMPLOYEE, ADD_EMPLOYEE, REMOVE_EMPLOYEE, GET_EMPLOYEES, GET_ERRORS } from './types/employeeTypes';

const rejectPromise = resError => {
  console.error(resError);
  let error = {};
  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }
  return Promise.reject(error);
};

export const getEmployees = () => async dispatch => {
  try {
    const res = await axios.get('/api/employee/list');
    dispatch({ type: GET_EMPLOYEES, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addEmployee = employee => async dispatch => {
  try {
    const res = await axios.post('/api/employee/add', employee);
    dispatch({ type: ADD_EMPLOYEE, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateEmployee = employee => async dispatch => {
  try {
    const res = await axios.patch(`/api/employee/${employee._id}`, employee);
    dispatch({ type: UPDATE_EMPLOYEE, payload: res.data });
    return res.data;
  } catch (error) {
    rejectPromise(error);
  }
};

export const deleteEmployee = employeeId => dispatch =>
  axios
    .delete(`/api/employee/${employeeId}`)
    .then(res => {
      dispatch({ type: REMOVE_EMPLOYEE, payload: employeeId });
      return res.data;
    })
    .catch(error => rejectPromise(error));

export const removeClient = employeeId => dispatch => {
  axios.delete(`/api/employee/${employeeId}`);
  dispatch({ type: REMOVE_EMPLOYEE, payload: employeeId });
};
