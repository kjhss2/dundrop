import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { initSearchItems, searchItemsFetch } from "../actions/itemSearchAction";

// Components
import ItemSearch from "../components/ItemSearch";
import SearchItems from "../components/SearchItems";

const Search = () => {

  const { itemName } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (itemName) {
      dispatch(searchItemsFetch(itemName));
    }
    return () => {
      dispatch(initSearchItems());
    };
  }, [dispatch, itemName]);

  return (
    <>
      <ItemSearch />
      <SearchItems />
    </>
  );
};

export default Search;