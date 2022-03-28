import { callAPI } from '../lib/CommonApi';
import * as ActionTypes from '../redux/ActionTypes';

export const itemSearchFetch = (itemName) => {

  console.log('in Action', itemName);
  if (!itemName) {
    window.alert('아이템명을 입력해 주세요.');
    return;
  } else {
    console.log('in Action222');
    callAPI(`/items?itemName=${itemName}&wordType=full`)
      .then(response => {
        console.log(response);
        // const { status, data } = response;
        // if (status === 200) {
        //   dispatch({
        //     type: ActionTypes.ITEM__FETCH_ITEMS,
        //   });
        // }
      });
  }
};

export const onChangeCommonField = (label, value) => ({
  type: ActionTypes.COMMON__ON_CHANGE_FIELD,
  label,
  value
});