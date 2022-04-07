import * as ActionTypes from '../ActionTypes';

const initState = {
  // Call API request
  isRequesting: false,
};

export const commonState = (state = Object.assign({}, initState), action) => {
  switch (action.type) {

    case ActionTypes.COMMON__FETCH_REQUEST:
      return { ...state, isRequesting: true };

    case ActionTypes.COMMON__FETCH_REQUEST_COMPLETE:
      return { ...state, isRequesting: false };

    default:
      return state;
  }
};
