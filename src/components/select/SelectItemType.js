import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectItemType({ itemType, setItemType }) {

  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">장비유형</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemType}
          label="장비유형"
          onChange={handleChange}
        >
          <MenuItem value={'ALL'}>전체부위</MenuItem>
          <MenuItem value={'상의'}>상의</MenuItem>
          <MenuItem value={'하의'}>하의</MenuItem>
          <MenuItem value={'머리어깨'}>머리어깨</MenuItem>
          <MenuItem value={'벨트'}>벨트</MenuItem>
          <MenuItem value={'신발'}>신발</MenuItem>
          <MenuItem value={'팔찌'}>팔찌</MenuItem>
          <MenuItem value={'목걸이'}>목걸이</MenuItem>
          <MenuItem value={'반지'}>반지</MenuItem>
          <MenuItem value={'보조장비'}>보조장비</MenuItem>
          <MenuItem value={'귀걸이'}>귀걸이</MenuItem>
          <MenuItem value={'마법석'}>마법석</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectItemType;