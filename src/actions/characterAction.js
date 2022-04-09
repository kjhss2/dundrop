import moment from 'moment';
import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';

export const characterSearchFetch = (charName) => {

  if (!charName) {
    window.alert('캐릭터명을 입력해 주세요.');
    return;
  }

  return (dispatch) => {
    callAPI(`/servers/all/characters?characterName=${charName}&wordType=full&limit=200&`, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.CHARACTER__FETCH_ITEMS,
            items: data.rows
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
            item: data
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
          item: data
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