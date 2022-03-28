import * as ActionTypes from '../ActionTypes';

const initState = {
  searchItems: [],
  searchItem: {},
};

export const itemSearchState = (state = Object.assign({}, initState), action) => {
  switch (action.type) {

    case ActionTypes.ITEM__INIT_ITEMS:
      return {
        ...state,
        searchItems: [],
        searchItem: {},
      };

    case ActionTypes.ITEM__FETCH_ITEMS:
      return {
        ...state,
        searchItems: action.items,
      };

    case ActionTypes.ITEM__FETCH_ITEM_DETAIL:
      return {
        ...state,
        searchItem: action.item,
      };

    case ActionTypes.ITEM__ON_CHANGE_FIELD:
      return { ...state, [action.label]: action.value };

    default:
      return state;
  }
};
