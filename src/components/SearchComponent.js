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
    dispatch(searchItems105Fetch(itemType, tags, keyword));
  };

  const onSetTags = (value) => {
    setTags(value);
    dispatch(searchItems105Fetch(itemType, value, keyword));
  };

  const onSetItemType = (value) => {
    setItemType(value);
    dispatch(searchItems105Fetch(value, tags, keyword));
  };

  return (
    <Box sx={{
      display: isMobile ? '' : 'flex',
      gap: 1,
    }}>

      <SelectItemType itemType={itemType} setItemType={onSetItemType} />

      <Box
        sx={{
          minWidth: 50,
          flexGrow: 1,
        }}
      >
        <SelectTag tags={tags} setTags={onSetTags} />
      </Box>

      <Box
        sx={{
          minWidth: 50,
          flexGrow: 1,
        }}
      >
        <TextField
          id="tf-name"
          label="아이템명"
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