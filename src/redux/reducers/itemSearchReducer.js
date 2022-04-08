import * as ActionTypes from '../ActionTypes';

const initState = {
  searchItems105: [],
  searchItems: [],
  searchItem: {},

  // selected filter
  selectedItemType: 'ALL',
  selectedTags: [],
  selectedKeyword: '',
};

export const itemSearchState = (state = Object.assign({}, initState), action) => {
  switch (action.type) {

    case ActionTypes.ITEM__INIT_ITEMS:
      return {
        ...state,
        searchItems105: [],
        searchItems: [],
        searchItem: {},
        // filter
        selectedItemType: 'ALL',
        selectedTags: [],
        selectedKeyword: '',
      };

    case ActionTypes.ITEM__FETCH_ITEMS:
      return {
        ...state,
        searchItems: action.items,
      };

    case ActionTypes.ITEM__FETCH_ITEMS_105:
      return {
        ...state,
        searchItems105: action.items,
        selectedItemType: action.selectedItemType,
        selectedTags: action.selectedTags,
        selectedKeyword: action.selectedKeyword,
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
