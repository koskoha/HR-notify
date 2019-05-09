import axios from 'axios';
import { ADD_CONTRACT, GET_CONTRACTS, GET_ERRORS } from './types/employeeTypes';

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

export const getContracts = () => async dispatch => {
  try {
    const res = await axios.get('/api/employee/contracts');
    dispatch({ type: GET_CONTRACTS, payload: res.data });
  } catch (error) {
    rejectPromise(error);
  }
};

export const addContract = name => async dispatch => {
  try {
    const res = await axios.post('/api/employee/contracts/add', name);
    console.log('res:', res);
    dispatch({ type: ADD_CONTRACT, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
