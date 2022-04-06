import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';
import { chooseByTagItems, itemDropInfos } from './commonData';

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

export const searchItems105Fetch = (tags, itemName) => {

  let requestUrl = '';

  if (tags && tags.length > 0) {

    let makeTagItemIds = '';
    tags.forEach(tag => {
      makeTagItemIds = makeTagItemIds.concat(itemDropInfos.filter(({ tags }) => tags.indexOf(tag) > -1).map(({ itemId }) => itemId));
    });
    if (!makeTagItemIds) {
      window.alert('해당 하는 Tag가 존재 하지 않습니다.');
      return () => { };
    }
    requestUrl = `/multi/items?itemIds=${makeTagItemIds}`;
  } else {
    requestUrl = `/items?itemName=${itemName}`;
  }

  const endPoint = `&q=minLevel:105,rarity:에픽&limit=30&wordType=front&`;
  const url = requestUrl + endPoint;

  return (dispatch) => {
    callAPI(url)
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

export const initSearchItems = () => ({
  type: ActionTypes.ITEM__INIT_ITEMS,
});

export const onChangeField = (label, value) => ({
  type: ActionTypes.ITEM__ON_CHANGE_FIELD,
  label,
  value
});