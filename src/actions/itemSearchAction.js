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

export const searchItems105Fetch = (itemTypeKeyword, tagsKeyword, itemNameKeyword) => {
  return (dispatch, getState) => {

    // Start isRequesting
    dispatch({ type: ActionTypes.COMMON__FETCH_REQUEST });

    let filteredItems = Object.assign([], allItems);

    if (tagsKeyword && tagsKeyword.length > 0) {
      tagsKeyword.forEach(tag => {
        filteredItems = filteredItems.filter(({ tags }) => {
          const splitTags = tags[0].split(',');
          if (splitTags.indexOf(tag) > -1) {
            return true;
          } else {
            return false;
          }
        });
      });
    }

    // 장비유형 필터
    if (itemTypeKeyword !== 'ALL') {
      filteredItems = filteredItems.filter(({ itemType }) => itemType.includes(itemTypeKeyword));
    }

    // 아이템명 필터
    if (itemNameKeyword) {
      filteredItems = filteredItems.filter(({ itemName }) => itemName.includes(itemNameKeyword));
    }

    // 검색된 캐릭터 보유 아이템 처리
    const { gettingItemIds } = getState().characterState;
    if (gettingItemIds && gettingItemIds.size > 0) {
      filteredItems = filteredItems.map((item) => {
        if (gettingItemIds.has(item.itemId)) {
          item['isGetting'] = true;
        } else {
          item['isGetting'] = false;
        }
        return item;
      });
    } else {
      // 더미데이터로 아이템 데이터 관리 처리를 위한 임시 코드 : 추후 아이템 데이터 DB 이관 후 리펙토링 예정
      filteredItems = filteredItems.map((item) => {
        item['isGetting'] = false;
        return item;
      });
    }

    // Stop isRequesting
    dispatch({ type: ActionTypes.COMMON__FETCH_REQUEST_COMPLETE });

    dispatch({
      type: ActionTypes.ITEM__FETCH_ITEMS_105,
      items: filteredItems,
      selectedItemType: itemTypeKeyword,
      selectedTags: tagsKeyword,
      selectedKeyword: itemNameKeyword,
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