import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";

// Actions
import { searchItems105Fetch } from "../actions/itemSearchAction";

// Components
import SelectItemType from "./select/SelectItemType";
import SelectTag from "./select/SelectTag";

const SearchComponent = () => {

  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.dimension);

  const [keyword, setKeyword] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [itemType, setItemType] = React.useState('ALL');

  const onSearch = () => {
    dispatch(searchItems105Fetch(tags, keyword));
  };

  return (
    <Box sx={{
      display: isMobile ? '' : 'flex',
      gap: 1,
    }}>

      <SelectItemType itemType={itemType} setItemType={setItemType} />

      <Box
        sx={{
          minWidth: 50,
          flexGrow: 1,
        }}
      >
        <SelectTag tags={tags} setTags={setTags} />
      </Box>

      <Box
        sx={{
          minWidth: 50,
          flexGrow: 1,
        }}
      >
        <TextField
          id="tf-name"
          label="아이템 검색"
          variant="outlined"
          fullWidth
          defaultValue={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </Box>

      <Button variant="text" onClick={() => onSearch()}>검색</Button>

    </Box>
  );
};

export default SearchComponent;