import { allItems } from '../../actions/commonData';
import * as ActionTypes from '../ActionTypes';

const initState = {
  characters: [],
  character: '',
  allEquipment: [],
  tagEquipmentSummary: [],

  timeline: [],
  gettingItemIds: new Set([]),
};

const makeGettingItemIds = (gettingItemIds, timeline) => {
  if (timeline && timeline.rows.length > 0) {
    timeline.rows.forEach(({ data }) => {
      if (data && data.itemId) {
        gettingItemIds.add(data.itemId);
      }
    });
  }

  // 타임라인 기반 보유 아이템 여부 업데이트
  allItems.forEach((item) => {
    if (gettingItemIds.has(item.itemId)) {
      item['isGetting'] = true;
    } else {
      item['isGetting'] = false;
    }
  });

  return gettingItemIds;
};

export const characterState = (state = Object.assign({}, initState), action) => {
  switch (action.type) {

    case ActionTypes.CHARACTER__INIT:
      return {
        ...state,
        characters: [],
        character: '',
        allEquipment: [],
        tagEquipmentSummary: [],
        timeline: [],
        gettingItemIds: new Set([]),
      };

    case ActionTypes.CHARACTER__FETCH_ITEMS:
      return {
        ...state,
        characters: action.items.sort(({ level }, { level: bLevel }) => bLevel - level),
      };

    case ActionTypes.CHARACTER__FETCH_EQUIPMENT:
      return {
        ...state,
        allEquipment: action.allEquipment,
        tagEquipmentSummary: action.tagEquipmentSummary,
      };

    case ActionTypes.CHARACTER__FETCH_TIMELINE:
      return {
        ...state,
        character: action.item,
        timeline: [...state.timeline, ...action.item.timeline.rows],
        gettingItemIds: makeGettingItemIds(state.gettingItemIds, action.item.timeline),
      };

    default:
      return state;
  }
};
