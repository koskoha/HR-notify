import * as errorTypes from '../actions/types/errorTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case errorTypes.SET_STATUS: {
      return { ...state, ...action.payload };
    }
    case errorTypes.GET_ERRORS:
      if (Object.prototype.hasOwnProperty.call(action.payload, 'emailexist')) {
        return { email: 'This email address is already singed up.' };
      }
      if (Object.prototype.hasOwnProperty.call(action.payload, 'usernotfound')) {
        return { email: 'The email address is not signed up.' };
      }
      return action.payload;
    case errorTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
