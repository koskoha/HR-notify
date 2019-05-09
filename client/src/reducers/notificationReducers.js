import * as employeeTypes from '../actions/types/employeeTypes';

export default function clientsReducers(state = [], action) {
  switch (action.type) {
    case employeeTypes.GET_NOTIFICATIONS: {
      return [...action.payload];
    }
    // case employeeTypes.ADD_EMPLOYEE: {
    //   return [...state, action.payload];
    // }
    // case employeeTypes.REMOVE_EMPLOYEE: {
    //   return state.filter(client => client._id !== action.payload);
    // }
    case employeeTypes.MARK_DONE: {
      return state.filter(Notification => Notification._id !== action.payload);
    }
    default:
      return state;
  }
}
