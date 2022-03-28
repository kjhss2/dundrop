import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { itemSearchFetch } from "../actions/itemSearchAction";
import ItemSearch from "../components/ItemSearch";

const Search = () => {

  const { itemName } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // onItemSearch();
    if (itemName) {
      dispatch(itemSearchFetch(itemName));
    }
    // return () => {
    //   console.log('컴포넌트가 화면에서 사라짐');
    // };
  }, [dispatch, itemName]);

  return (
    <div>
      <h1>아이템 검색</h1>
      <ItemSearch />
    </div>
  );
};

export default Search;