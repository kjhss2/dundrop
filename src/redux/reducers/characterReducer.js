import * as ActionTypes from '../ActionTypes';

const initState = {
  characters: [],
  character: '',
  gettingItemIds: [],
  gettingItemIdsCount: 0,
};

const makeGettingItemIds = ({ timeline }) => {
  let ids = new Set([]);
  if (timeline && timeline.rows.length > 0) {
    timeline.rows.forEach(({ data }) => {
      ids.add(data.itemId);
    });
  }
  return ids;
};

export const characterState = (state = Object.assign({}, initState), action) => {
  switch (action.type) {

    case ActionTypes.CHARACTER__INIT:
      return {
        ...state,
        characters: [],
        character: '',
        gettingItemIds: [],
        gettingItemIdsCount: 0,
      };

    case ActionTypes.CHARACTER__FETCH_ITEMS:
      return {
        ...state,
        characters: action.items.sort(({ level }, { level: bLevel }) => bLevel - level),
      };

    case ActionTypes.CHARACTER__FETCH_TIMELINE:
      return {
        ...state,
        character: action.item,
        gettingItemIds: makeGettingItemIds(action.item),
        gettingItemIdsCount: action.item.timeline.rows.length
      };

    default:
      return state;
  }
};
