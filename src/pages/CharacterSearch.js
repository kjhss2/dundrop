import React from "react";
import CharacterItems from "../components/CharacterItems";

// Components
import CharacterSearchComponent from '../components/CharacterSearchComponent';

const CharacterSearch = () => {
  return (
    <>
      <CharacterSearchComponent />
      <CharacterItems />
    </>
  );
};

export default CharacterSearch;