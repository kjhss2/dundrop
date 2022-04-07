import React from "react";
import { useSelector } from "react-redux";

// Components
import SimpleSearchComponent from "../components/SimpleSearchComponent";
import SimpleSearchItems from "../components/SimpleSearchItems";

const ItemSearch = () => {

  const { searchItems } = useSelector((state) => state.itemSearchState);

  return (
    <>
      <SimpleSearchComponent />
      <SimpleSearchItems items={searchItems} />
    </>
  );
};

export default ItemSearch;