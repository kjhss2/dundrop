import moment from 'moment';
import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';
import { allItems, excludeTags } from './commonData';

export const characterSearchFetch = (charName) => {

  if (!charName) {
    window.alert('캐릭터명을 입력해 주세요.');
    return () => { };
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
      // 검색 이력이 5개가 넘는다면 마지막 검색 기록 제거 처리
      if (histories.length > 4) {
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

export const selectCharacter = (isSelect, serverId, characterId, characterName, navigate) => {

  let selectedCharacters = Object.assign([], JSON.parse(sessionStorage.getItem("selectedCharacters")));

  if (selectedCharacters !== null) {
    // 캐릭터 선택 시
    if (isSelect) {
      if (selectedCharacters.length >= 4) {
        window.alert('다중 캐릭터는 최대 4개까지 선택 가능합니다.');
      } else {
        // 중복 여부 검사
        let isAddPossible = true;
        selectedCharacters.forEach(c => {
          if (c.serverId === serverId && c.characterId === characterId) {
            window.alert('중복된 다중 캐릭터 입니다.');
            isAddPossible = false;
          }
        });
        // 중복 여부 검사 끝
        if (isAddPossible) {
          selectedCharacters = [...selectedCharacters, { serverId, characterId, characterName, timeline: [] }];
          window.sessionStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
        }
      }
    } else {
      //캐릭터 해제 시

      let spliceIndex = -1;
      selectedCharacters.forEach((c, index) => {
        if (c.serverId === serverId && c.characterId === characterId) {
          // spliceIndex 획득
          spliceIndex = index;
        }
      });

      if (spliceIndex > -1) {
        selectedCharacters.splice(spliceIndex, 1);
        window.sessionStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
      }
    }
  } else {
    selectedCharacters = [{ serverId, characterId, characterName, timeline: [] }];
    window.sessionStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
  }

  return (dispatch) => {
    dispatch({
      type: ActionTypes.CHARACTER__SELECT_CHARACTERS,
      selectedCharacters
    });

    // 4개의 다중 캐릭터가 선택 되었다면 캐릭터 상세 페이지 이동
    if (selectedCharacters && selectedCharacters.length === 4) {
      navigate(`/character/${serverId}/${characterId}`);
    }

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
          let totalEquipmentGrowLevel = 0;

          // API로 조회된 정보에 장착 장비 Tag, tags, desc 데이터 setting 작업(10점짜리 코드..)
          data.equipment.forEach(eq => {

            // 장착아이템 총 성장레벨 계산
            eq.growInfo && eq.growInfo.options.forEach(option => {
              totalEquipmentGrowLevel += option.level;
            });

            filteredItems = [...filteredItems, ...allItems.filter(({ itemName }) => itemName === eq.itemName).map(item => {

              // 장착 장비 TAG요약 정보 획득
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
              eq['dropInfos'] = item.dropInfos;
              eq['isCore'] = item.isCore;
              eq['isCoreDesc'] = item.isCoreDesc;
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
          // 장착 장비 TAG요약 정보 정렬(sort)
          tagEquipmentSummary.sort(({ value }, { value: bValue }) => bValue - value);

          dispatch({
            type: ActionTypes.CHARACTER__FETCH_EQUIPMENT,
            allEquipment: data.equipment,
            tagEquipmentSummary,
            totalEquipmentGrowLevel,
          });
        }
      });
  };
};

export const characterTimelineFetch = (serverId, characterId, isMainCharacter = false) => {
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
          if (isMainCharacter) {
            dispatch({
              type: ActionTypes.CHARACTER__FETCH_TIMELINE,
              timeline: data.timeline,
              serverId,
              characterId,
              characterName: data.characterName,
              isMainCharacter,
            });
          } else {
            dispatch({
              type: ActionTypes.CHARACTER__SELECT_CHARACTER_TIMELINE,
              timeline: data.timeline,
              serverId,
              characterId,
              characterName: data.characterName,
              isMainCharacter,
            });
          }

          // get timeline next data
          if (data.timeline.next) {
            characterTimelineFetchNext(dispatch, serverId, characterId, data.timeline.next, isMainCharacter);
          }
        }
      });
  };
};

export const characterTimelineFetchNext = async (dispatch, serverId, characterId, next, isMainCharacter = false) => {
  callAPI(`/servers/${serverId}/characters/${characterId}/timeline?next=${next}&`, {}, dispatch)
    .then(response => {
      const { status, data } = response;
      if (status === 200) {
        if (isMainCharacter) {
          dispatch({
            type: ActionTypes.CHARACTER__FETCH_TIMELINE,
            timeline: data.timeline,
            serverId,
            characterId,
            characterName: data.characterName,
            isMainCharacter,
          });
        } else {
          dispatch({
            type: ActionTypes.CHARACTER__SELECT_CHARACTER_TIMELINE,
            timeline: data.timeline,
            serverId,
            characterId,
            characterName: data.characterName,
            isMainCharacter,
          });
        }
        if (data.timeline.next) {
          characterTimelineFetchNext(dispatch, serverId, characterId, data.timeline.next);
        }
      }
    });
};

export const initCharacter = () => ({
  type: ActionTypes.CHARACTER__INIT,
});

export const initTimeline = () => ({
  type: ActionTypes.CHARACTER__INIT_TIMELINE,
});

export const onChangeField = (label, value) => ({
  type: ActionTypes.CHARACTER__ON_CHANGE_FIELD,
  label,
  value
});