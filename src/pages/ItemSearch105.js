import React from "react";
import { useSelector } from "react-redux";

// Components
import SearchComponent from "../components/SearchComponent";
import SearchItems from "../components/SearchItems";

const ItemSearch105 = () => {

  const { searchItems105 } = useSelector((state) => state.itemSearchState);

  return (
    <>
      <SearchComponent />
      <SearchItems items={searchItems105} />
    </>
  );
};

export default ItemSearch105;