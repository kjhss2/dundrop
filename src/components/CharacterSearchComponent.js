import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, TextField } from "@mui/material";

// Actions
import { characterSearchFetch } from "../actions/characterAction";

const CharacterSearchComponent = () => {

  const dispatch = useDispatch();
  const [charName, setCharName] = React.useState('');

  const onSearch = () => {
    dispatch(characterSearchFetch(charName));
  };

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
      }}>
        <TextField
          id="outlined-basic"
          label="캐릭터 검색"
          variant="outlined"
          fullWidth
          onChange={(e) => setCharName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </Box>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
      }}>
        <Button variant="text" onClick={() => onSearch()}>검색</Button>
      </Box>
    </Box>
  );
};

export default CharacterSearchComponent;