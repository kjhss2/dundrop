import moment from 'moment';
import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';
import { allItems, excludeTags } from './commonData';

export const characterSearchFetch = (charName) => {

  if (!charName) {
    window.alert('캐릭터명을 입력해 주세요.');
    return;
  }

  let wordType = '&wordType=full';
  // 한 글자 아이디 검색 시에만 검색유형 match 처리
  if (charName.length === 1) {
    wordType = '&wordType=match';
  }

  // 캐릭터 검색 이력 저장
  let characterSearchHistory = window.sessionStorage.getItem('characterSearchHistory');
  if (characterSearchHistory !== null) {

    const histories = characterSearchHistory.split(',');
    // 최근 검색 캐릭터명이 같다면 이력 제외 처리
    if (histories[0] !== charName) {
      // 검색 이력이 10개가 넘는다면 마지막 검색 기록 제거 처리
      if (histories.length > 10) {
        const lastCommaIndex = characterSearchHistory.lastIndexOf(',');
        characterSearchHistory = characterSearchHistory.substring(0, lastCommaIndex);
      }
      characterSearchHistory = charName.concat(',' + characterSearchHistory);
      window.sessionStorage.setItem('characterSearchHistory', characterSearchHistory);
    }
  } else {
    characterSearchHistory = charName;
    window.sessionStorage.setItem('characterSearchHistory', characterSearchHistory);
  }

  return (dispatch) => {
    callAPI(`/servers/all/characters?characterName=${encodeURIComponent(charName)}${wordType}&limit=200&`, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.CHARACTER__FETCH_ITEMS,
            items: data.rows,
            characterSearchHistory
          });

          // 조회된 캐릭터 목록 장비 요약 생성
          // data.rows.filter(({ level }) => level === 110).forEach(character => {
          //   characterEquipmentSearchFetch(character.serverId, character.characterId);
          // });
        }
      });
  };
};

export const characterInfoFetch = (serverId, characterId) => {
  return (dispatch) => {
    callAPI(`/servers/${serverId}/characters/${characterId}/status?`, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.CHARACTER__FETCH_INFO,
            item: data
          });
        }
      });
  };
};

export const characterEquipmentSearchFetch = (serverId, characterId) => {
  return (dispatch) => {
    callAPI(`/servers/${serverId}/characters/${characterId}/equip/equipment?&`, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {

          let filteredItems = [];
          let tagEquipmentSummary = new Map();

          // API로 조회된 정보에 장착 장비 Tag, tags, desc 데이터 setting 작업(10점짜리 코드..)
          data.equipment.forEach(eq => {
            filteredItems = [...filteredItems, ...allItems.filter(({ itemName }) => itemName === eq.itemName).map(item => {

              // 장착 장비 Tag 요약 정보 획득
              item.tags[0].split(',').filter(tag => !excludeTags.includes(tag)).forEach(tag => {
                // 이미 tag가 존재하면 카운터 추가, 없다면 신규 set 추가
                if (tagEquipmentSummary.has(tag)) {
                  const getTag = tagEquipmentSummary.get(tag);
                  tagEquipmentSummary.delete(tag);
                  tagEquipmentSummary.set(tag, getTag + 1);
                } else {
                  tagEquipmentSummary.set(tag, 1);
                }
              });

              // tags, desc setting
              eq['tags'] = item.tags;
              eq['desc'] = item.desc;
              return eq;
            })];

            // 신화 아이템은 별도 처리(추후 신화 아이템도 아이템 데이터에 추가)
            if (eq.itemRarity === '신화') {
              eq['tags'] = ['신화'];
              filteredItems = [...filteredItems, eq];
            }
          });

          // map to array
          tagEquipmentSummary = Array.from(tagEquipmentSummary, ([name, value]) => ({ name, value }));
          // 장착 장비 Tag 요약 정보 정렬(sort)
          tagEquipmentSummary.sort(({ value }, { value: bValue }) => bValue - value);

          dispatch({
            type: ActionTypes.CHARACTER__FETCH_EQUIPMENT,
            allEquipment: data.equipment,
            tagEquipmentSummary
          });
        }
      });
  };
};

export const characterTimelineFetch = (serverId, characterId) => {
  // 검색 시작일 : 현재날짜 3달 전
  const startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
  // 검색 종료일 : 현재날짜
  const endDate = moment().format('YYYY-MM-DD HH:mm');
  return (dispatch) => {
    // code 504 : 아이템 획득(항아리)
    // code 505 : 아이템 획득(지옥 파티)
    // code 515 : 아이템 초월 수령 (NPC)
    // code 516 : 아이템 초월 (초월의돌)
    callAPI(`/servers/${serverId}/characters/${characterId}/timeline?limit=100&startDate=${startDate}&endDate=${endDate}&code=504,505,515,516&`, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.CHARACTER__FETCH_TIMELINE,
            timeline: data.timeline
          });

          // get timeline next data
          if (data.timeline.next) {
            characterTimelineFetchNext(dispatch, serverId, characterId, data.timeline.next);
          }
        }
      });
  };
};

export const characterTimelineFetchNext = async (dispatch, serverId, characterId, next) => {
  callAPI(`/servers/${serverId}/characters/${characterId}/timeline?next=${next}&`, {}, dispatch)
    .then(response => {
      const { status, data } = response;
      if (status === 200) {
        dispatch({
          type: ActionTypes.CHARACTER__FETCH_TIMELINE,
          timeline: data.timeline,
        });
        if (data.timeline.next) {
          characterTimelineFetchNext(dispatch, serverId, characterId, data.timeline.next);
        }
      }
    });
};

export const initCharacter = () => ({
  type: ActionTypes.CHARACTER__INIT,
});

export const onChangeField = (label, value) => ({
  type: ActionTypes.CHARACTER__ON_CHANGE_FIELD,
  label,
  value
});