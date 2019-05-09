import * as clientTypes from '../actions/types/employeeTypes';

export default function clientsReducers(state = [], action) {
  switch (action.type) {
    case clientTypes.GET_EMPLOYEES: {
      return [...action.payload];
    }
    case clientTypes.ADD_EMPLOYEE: {
      return [...state, action.payload];
    }
    case clientTypes.REMOVE_EMPLOYEE: {
      return state.filter(client => client._id !== action.payload);
    }
    case clientTypes.UPDATE_EMPLOYEE: {
      return state;
    }
    default:
      return state;
  }
}
