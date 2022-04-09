import React from "react";

// Actions
import { initGettingItems } from "../actions/itemSearchAction";

// Components
import CharacterSearchComponent from '../components/CharacterSearchComponent';
import CharacterItems from "../components/CharacterItems";

const CharacterSearch = () => {

  React.useEffect(() => {
    initGettingItems();
  }, []);

  return (
    <>
      <CharacterSearchComponent />
      <CharacterItems />
    </>
  );
};

export default CharacterSearch;