import moment from 'moment';
import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';

export const characterSearchFetch = (charName) => {

  if (!charName) {
    window.alert('캐릭터명을 입력해 주세요.');
    return;
  }

  return (dispatch) => {
    callAPI(`/servers/all/characters?characterName=${charName}&`, {}, dispatch)
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
  const startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
  // 검색 종료일 : 현재날짜
  const endDate = moment().format('YYYY-MM-DD');
  return (dispatch) => {
    callAPI(`/servers/${serverId}/characters/${characterId}/timeline?limit=100&startDate=${startDate}&endDate=${endDate}&code=505&`, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.CHARACTER__FETCH_TIMELINE,
            item: data
          });
        }
      });
  };
};

export const initCharacter = () => ({
  type: ActionTypes.CHARACTER__INIT,
});