import { allItems } from '../../actions/commonData';
import * as ActionTypes from '../ActionTypes';

const initState = {
  characterSearchHistory: window.sessionStorage.getItem('characterSearchHistory') || '',
  characters: [],
  character: '',
  allEquipment: [],
  tagEquipmentSummary: [],
  timeline: [],
  gettingItemIds: new Set([]),

  // 다중 캐릭터 변수
  selectedCharacters: JSON.parse(sessionStorage.getItem("selectedCharacters")) || [],
  totalEquipmentGrowLevel: 0,
};

const makeGettingItemIds = (
  gettingItemIds,
  timeline,
  serverId,
  characterId,
  characterName,
  isMainCharacter
) => {

  let selectedCharactersGettingItemIds = new Set([]);

  if (timeline && timeline.rows.length > 0) {
    timeline.rows.forEach(({ data }) => {
      if (data && data.itemId) {
        if (isMainCharacter) {
          gettingItemIds.add(data.itemId);
        }
        selectedCharactersGettingItemIds.add(data.itemId);
      }
    });

    // 다중 캐릭터 timelie setting
    /*
    selectedCharacters && selectedCharacters.forEach(c => {
      if (c.serverId === serverId && c.characterId === characterId) {
        c['timeline'] = [...c['timeline'], ...timeline.rows];
      }
    });
    */
  }

  // 타임라인 기반 보유 아이템 여부 업데이트
  allItems.forEach((item) => {

    // 메인 캐릭터 isGetting 처리
    if (isMainCharacter) {
      if (gettingItemIds.has(item.itemId)) {
        item['isGetting'] = true;
      } else {
        item['isGetting'] = false;
      }
    }

    // 다중 캐릭터 isGetting 처리
    if (selectedCharactersGettingItemIds.has(item.itemId)) {
      if (item['selectedCharactersGettting']) {
        let findGetting = false;
        item['selectedCharactersGettting'].forEach(c => {
          if (c.serverId === serverId && c.characterId === characterId) {
            if (c.isGetting === false) {
              c.isGetting = true;
            }
            findGetting = true;
          }
        });
        if (findGetting === false) {
          item['selectedCharactersGettting'] = [...item['selectedCharactersGettting'], { serverId, characterId, characterName, isGetting: true }];
        }
      } else {
        item['selectedCharactersGettting'] = [{ serverId, characterId, characterName, isGetting: true }];
      }
    } else {
      if (item['selectedCharactersGettting'] && item['selectedCharactersGettting'].length > 0) {
        let findGetting = false;
        item['selectedCharactersGettting'].forEach(c => {
          if (c.serverId === serverId && c.characterId === characterId) {
            findGetting = true;
          }
        });

        if (findGetting === false) {
          item['selectedCharactersGettting'] = [...item['selectedCharactersGettting'], { serverId, characterId, characterName, isGetting: false }];
        }
      } else {
        item['selectedCharactersGettting'] = [{ serverId, characterId, characterName, isGetting: false }];
      }
    }
  });

  return { gettingItemIds };
};

export const characterState = (state = Object.assign({}, initState), action) => {
  switch (action.type) {

    case ActionTypes.CHARACTER__INIT:
      return {
        ...state,
        character: '',
        allEquipment: [],
        tagEquipmentSummary: [],
        timeline: [],
        gettingItemIds: new Set([]),
        totalEquipmentGrowLevel: 0,
      };

    case ActionTypes.CHARACTER__FETCH_ITEMS:
      return {
        ...state,
        characters: action.items.sort(({ level }, { level: bLevel }) => bLevel - level),
        characterSearchHistory: action.characterSearchHistory,
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
        totalEquipmentGrowLevel: action.totalEquipmentGrowLevel,
      };

    case ActionTypes.CHARACTER__FETCH_INFO:
      return {
        ...state,
        character: action.item,
      };

    case ActionTypes.CHARACTER__INIT_TIMELINE:
      return {
        ...state,
        timeline: [],
        selectedCharacters: state.selectedCharacters.map(c => {
          c.timeline = [];
          return c;
        }),
        gettingItemIds: new Set([]),
        totalEquipmentGrowLevel: 0,
      };

    case ActionTypes.CHARACTER__FETCH_TIMELINE:

      const { gettingItemIds } = makeGettingItemIds(
        state.gettingItemIds,
        action.timeline,
        action.serverId,
        action.characterId,
        action.characterName,
        action.isMainCharacter,
      );

      return {
        ...state,
        timeline: [...state.timeline, ...action.timeline.rows],
        gettingItemIds,
      };

    case ActionTypes.CHARACTER__SELECT_CHARACTER_TIMELINE:
      makeGettingItemIds(
        state.gettingItemIds,
        action.timeline,
        action.serverId,
        action.characterId,
        action.characterName,
        action.isMainCharacter,
      );
      return {
        ...state,
      };

    case ActionTypes.CHARACTER__ON_CHANGE_FIELD:
      return { ...state, [action.label]: action.value };

    default:
      return state;
  }
};
