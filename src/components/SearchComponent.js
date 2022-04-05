import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

// Actions
import { searchItems105Fetch } from "../actions/itemSearchAction";
import SelectTag from "./select/SelectTag";

const SearchComponent = () => {

  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [itemType, setItemType] = React.useState('ALL');

  const onSearch = () => {
    dispatch(searchItems105Fetch(keyword, tags));
  };

  return (
    <Box sx={{
      display: 'flex',
      gap: 1
    }}>

      <ItemTypeSelect itemType={itemType} setItemType={setItemType} />

      <SelectTag tags={tags} setTags={setTags} />

      <TextField
        id="tf-name"
        label="아이템 검색"
        variant="outlined"
        fullWidth
        defaultValue={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />

      <Button variant="text" onClick={() => onSearch()}>검색</Button>

    </Box>
  );
};

function ItemTypeSelect({ itemType, setItemType }) {

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

export default SearchComponent;