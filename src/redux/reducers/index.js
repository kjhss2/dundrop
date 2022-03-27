import { combineReducers } from 'redux';

import * as ActionTypes from '../ActionTypes';

// reducers
import { commonState } from './commonReducer';

// dimension
const dimension = (state = { height: window.innerHeight, width: window.innerWidth }, action) => {
  if (action.type === ActionTypes.COMMON__SET_DIMENSION) {
    return { height: action.height, width: action.width };
  }
  return state;
};

const rootReducer = combineReducers({
  // 공통
  commonState,

  // browser width, height
  dimension,
});

export default rootReducer;