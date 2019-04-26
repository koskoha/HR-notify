import axios from 'axios';
import { GET_NOTIFICATIONS, MARK_DONE } from './types/employeeTypes';

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

export const markDone = notificationId => async dispatch => {
  try {
    await axios.patch(`/employee/notifications/${notificationId}`);
    dispatch({ type: MARK_DONE, payload: notificationId });
    // return res.data;
  } catch (error) {
    rejectPromise(error);
  }
};
