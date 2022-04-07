import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, TextField } from "@mui/material";

// Actions
import { searchItemsFetch } from "../actions/itemSearchAction";

const SimpleSearchComponent = () => {

  const dispatch = useDispatch();
  const [itemName, setItemName] = React.useState('');

  const goToItemSearch = () => {
    if (!itemName) {
      window.alert('아이템명을 입력해 주세요.!!');
      return;
    }

    dispatch(searchItemsFetch(itemName));
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
          label="아이템 검색"
          variant="outlined"
          fullWidth
          onChange={(e) => setItemName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goToItemSearch()}
        />
      </Box>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
      }}>
        <Button variant="text" onClick={() => goToItemSearch()}>검색</Button>
      </Box>
    </Box>
  );
};

export default SimpleSearchComponent;