import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";

// Actions
import { characterSearchFetch, onChangeField } from "../actions/characterAction";

const CharacterSearchComponent = () => {

  const dispatch = useDispatch();
  const [charName, setCharName] = React.useState('');
  const { characterSearchHistory } = useSelector((state) => state.characterState);

  const onSearch = () => {
    dispatch(characterSearchFetch(charName));
  };

  const removeSession = () => {
    window.sessionStorage.removeItem('characterSearchHistory');
    dispatch(onChangeField('characterSearchHistory', ''));
  };

  return (
    <>
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
          <Button variant="text" onClick={onSearch}>검색</Button>
        </Box>
      </Box>
      {
        characterSearchHistory &&
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          alignItems: 'center'
        }}>
          <Typography>최근 검색 이력</Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}>
            {
              characterSearchHistory && characterSearchHistory.split(',').map((history, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                }}>
                  <Button variant="text" onClick={() => dispatch(characterSearchFetch(history))}>{history}</Button>
                </Box>
              ))
            }
            <Button variant="contained" color="primary" onClick={removeSession}>검색 이력 초기화</Button>
          </Box>
        </Box>
      }
    </>
  );
};

export default CharacterSearchComponent;