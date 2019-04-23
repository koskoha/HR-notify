import axios from 'axios';
import { GET_NOTIFICATIONS } from './types';

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

export const getNotifications = () => async dispatch => {
  try {
    const res = await axios.get('/employee/notifications');
    dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
  } catch (error) {
    rejectPromise(error);
  }
};

// export const addEmployee = employee => async dispatch => {
//   try {
//     const res = await axios.post('/employee/add', employee);
//     dispatch({ type: ADD_EMPLOYEE, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data,
//     });
//   }
// };

// export const updateEmployee = employee => async dispatch => {
//   try {
//     const res = await axios.patch(`/employee/${employee._id}`, employee);
//     dispatch({ type: UPDATE_EMPLOYEE, payload: res.data });
//     return res.data;
//   } catch (error) {
//     rejectPromise(error);
//   }
// };

// export const deleteEmployee = employeeId => dispatch =>
//   axios
//     .delete(`/employee/${employeeId}`)
//     .then(res => {
//       dispatch({ type: REMOVE_EMPLOYEE, payload: employeeId });
//       return res.data;
//     })
//     .catch(error => rejectPromise(error));

// export const removeClient = employeeId => dispatch => {
//   axios.delete(`/api/employee/${employeeId}`);
//   dispatch({ type: REMOVE_EMPLOYEE, payload: employeeId });
// };
