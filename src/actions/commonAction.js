import * as ActionTypes from '../redux/ActionTypes';

export const setDimension = (dimension) => ({
  type: ActionTypes.COMMON__SET_DIMENSION,
  height: dimension.height,
  width: dimension.width
});

export const onChangeCommonField = (label, value) => ({
  type: ActionTypes.COMMON__ON_CHANGE_FIELD,
  label,
  value
});
