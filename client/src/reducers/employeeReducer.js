import * as clientActions from '../actions/types/employeeTypes';

export default function clientsReducers(state = [], action) {
  switch (action.type) {
    case clientActions.GET_EMPLOYEES: {
      return [...action.payload];
    }
    case clientActions.ADD_EMPLOYEE: {
      return [...state, action.payload];
    }
    case clientActions.REMOVE_EMPLOYEE: {
      return state.filter(client => client._id !== action.payload);
    }
    case clientActions.UPDATE_EMPLOYEE: {
      return state;
    }
    default:
      return state;
  }
}
