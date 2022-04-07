import React from "react";
import { useSelector } from "react-redux";

// Components
import SimpleSearchComponent from "../components/SimpleSearchComponent";
import SearchItems from "../components/SearchItems";

const ItemSearch = () => {

  const { searchItems } = useSelector((state) => state.itemSearchState);

  return (
    <>
      <SimpleSearchComponent />
      <SearchItems items={searchItems} />
    </>
  );
};

export default ItemSearch;