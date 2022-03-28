import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ItemSearch = () => {

  const { itemName: itemNameParam } = useParams();
  const [itemName, setItemName] = React.useState(itemNameParam);
  const navigate = useNavigate();

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
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <TextField
        id="outlined-basic"
        label="아이템 검색"
        variant="outlined"
        defaultValue={itemNameParam}
        onChange={(e) => setItemName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && goToItemSearch()}
      />
      <Button variant="text" onClick={() => goToItemSearch()}>검색</Button>
    </Box>
  );
};

export default ItemSearch;