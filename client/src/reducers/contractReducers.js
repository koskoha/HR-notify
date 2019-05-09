import * as employeeTypes from '../actions/types/employeeTypes';

export default function clientsReducers(state = [], action) {
  switch (action.type) {
    case employeeTypes.GET_CONTRACTS: {
      return [...action.payload];
    }
    case employeeTypes.ADD_CONTRACT: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
