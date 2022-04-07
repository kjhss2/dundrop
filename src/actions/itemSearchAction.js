import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';
import { allItems } from './commonData';

export const searchItemsFetch = (itemName) => {

  if (!itemName) {
    window.alert('아이템명을 입력해 주세요.');
    return;
  }

  return (dispatch) => {
    callAPI(`/items?itemName=${itemName}&wordType=front&`)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.ITEM__FETCH_ITEMS,
            items: data.rows
          });
        }
      });
  };
};

export const searchItemDetailFetch = (id) => {
  return (dispatch) => {
    callAPI(`/items/${id}?`)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.ITEM__FETCH_ITEM_DETAIL,
            item: data
          });
        }
      });
  };
};

export const searchItems105Fetch = (searchTags, itemName) => {

  let requestUrl = '';

  if (searchTags && searchTags.length > 0) {

    let makeTagItemIds = '';
    let idCount = 0;

    searchTags.forEach(tag => {
      makeTagItemIds = makeTagItemIds.concat(allItems.filter(({ tags }) => {
        // 과도한 반복된 split : 성능 최적화 필요
        const splitTags = tags[0].split(',');
        if (splitTags.indexOf(tag) > -1) {
          idCount++;
          return true;
        } else {
          return false;
        }
      }).map(({ itemId }) => itemId));
    });

    if (!makeTagItemIds) {
      window.alert('해당 하는 Tag가 존재 하지 않습니다.');
      return () => { };
    }
    if (idCount > 30) {
      // window.alert('조회하려는 아이템 개수가 초과되었습니다.');
      // return () => { };
    }
    requestUrl = `/multi/items?itemIds=${makeTagItemIds}`;
  } else {
    requestUrl = `/items?itemName=${itemName}`;
  }

  const endPoint = `&q=minLevel:105,rarity:에픽&limit=30&wordType=front&`;
  const url = requestUrl + endPoint;

  return (dispatch) => {
    callAPI(url, {}, dispatch)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({
            type: ActionTypes.ITEM__FETCH_ITEMS_105,
            items: data.rows
          });
        } else {
          console.log(data.error.message);
          dispatch({
            type: ActionTypes.ITEM__FETCH_ITEMS_105,
            items: []
          });
        }
      });
  };
};

export const initSearchItems = () => ({
  type: ActionTypes.ITEM__INIT_ITEMS,
});

export const onChangeField = (label, value) => ({
  type: ActionTypes.ITEM__ON_CHANGE_FIELD,
  label,
  value
});