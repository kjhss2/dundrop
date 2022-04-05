import React from "react";
import { useDispatch } from "react-redux";

// Components
import SearchItems from "../components/SearchItems";
import SearchComponent from "../components/SearchComponent";

// Actions
import { initSearchItems } from "../actions/itemSearchAction";

const ItemSearch105 = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initSearchItems());
  }, [dispatch]);

  return (
    <>
      <SearchComponent />
      <SearchItems />
    </>
  );
};

export default ItemSearch105;