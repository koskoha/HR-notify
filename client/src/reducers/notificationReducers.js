import * as clientActions from '../actions/types/employeeTypes';

export default function clientsReducers(state = [], action) {
  switch (action.type) {
    case clientActions.GET_NOTIFICATIONS: {
      return [...action.payload];
    }
    // case clientActions.ADD_EMPLOYEE: {
    //   return [...state, action.payload];
    // }
    // case clientActions.REMOVE_EMPLOYEE: {
    //   return state.filter(client => client._id !== action.payload);
    // }
    case clientActions.MARK_DONE: {
      return state.filter(Notification => Notification._id !== action.payload);
    }
    default:
      return state;
  }
}
