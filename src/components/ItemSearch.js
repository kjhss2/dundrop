import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ItemSearch = () => {

  const { itemName: itemNameParam } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = React.useState(itemNameParam);

  const goToItemSearch = () => {
    if (!itemName) {
      window.alert('아이템명을 입력해 주세요.!!');
      return;
    }
    navigate(`/search/${itemName}`);
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
          defaultValue={itemNameParam}
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

export default ItemSearch;