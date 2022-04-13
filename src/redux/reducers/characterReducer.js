import { allItems } from '../../actions/commonData';
import * as ActionTypes from '../ActionTypes';

const initState = {
  characterSearchHistory: window.sessionStorage.getItem('characterSearchHistory') || '',
  characters: [],
  selectedCharacters: JSON.parse(sessionStorage.getItem("selectedCharacters")) || [],
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
        characterSearchHistory: action.characterSearchHistory
      };

    case ActionTypes.CHARACTER__SELECT_CHARACTERS:
      return {
        ...state,
        selectedCharacters: action.selectedCharacters
      };

    case ActionTypes.CHARACTER__FETCH_EQUIPMENT:
      return {
        ...state,
        allEquipment: action.allEquipment,
        tagEquipmentSummary: action.tagEquipmentSummary,
      };

    case ActionTypes.CHARACTER__FETCH_INFO:
      return {
        ...state,
        character: action.item,
      };

    case ActionTypes.CHARACTER__FETCH_TIMELINE:
      return {
        ...state,
        timeline: [...state.timeline, ...action.timeline.rows],
        gettingItemIds: makeGettingItemIds(state.gettingItemIds, action.timeline),
      };

    case ActionTypes.CHARACTER__ON_CHANGE_FIELD:
      return { ...state, [action.label]: action.value };

    default:
      return state;
  }
};
