import { allItems } from '../../actions/commonData';
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

  // 타임라인 기반 보유 아이템 여부 업데이트
  allItems.forEach((item) => {
    if (ids.has(item.itemId)) {
      item['isGetting'] = true;
    } else {
      item['isGetting'] = false;
    }
  });

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
        gettingItemIdsCount: action.item.timeline.rows.length,
      };

    default:
      return state;
  }
};
