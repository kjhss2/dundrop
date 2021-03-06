import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, TextField } from "@mui/material";

// Actions
import { searchItems105Fetch } from "../actions/itemSearchAction";

// Components
import SelectItemType from "./select/SelectItemType";
import SelectTag from "./select/SelectTag";
import TooltipComponent from "./TooltipComponent";

const SearchComponent = () => {

  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.dimension);
  const { selectedItemType, selectedTags, selectedKeyword } = useSelector((state) => state.itemSearchState);

  // react-state
  const [itemType, setItemType] = React.useState(selectedItemType);
  const [tags, setTags] = React.useState(selectedTags);
  const [keyword, setKeyword] = React.useState(selectedKeyword);
  const [open, setOpen] = React.useState(false);

  const onSearch = () => {
    dispatch(searchItems105Fetch(itemType, tags, keyword));
  };

  const onSetTags = (_tags) => {
    setTags(_tags);
    dispatch(searchItems105Fetch(itemType, _tags, keyword));
  };

  const onSetItemType = (_itemType) => {
    setItemType(_itemType);
    dispatch(searchItems105Fetch(_itemType, tags, keyword));
  };

  return (
    <Box sx={{
      display: isMobile ? '' : 'flex',
      // alignItems: 'center',
      gap: 1,
    }}>

      <Box sx={{
        flexGrow: 1,
        display: isMobile ? 'flex' : 'flex', gap: 1
      }}>
        <SelectItemType itemType={itemType} setItemType={onSetItemType} />
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 50,
          }}
          onClick={() => setOpen(!open)}
        >
          <SelectTag tags={tags} setTags={onSetTags} open={open} setOpen={setOpen} />
        </Box>
      </Box>

      <Box sx={{
        flexGrow: 1,
        display: isMobile ? 'flex' : 'flex', gap: 1,
        marginTop: isMobile ? 1 : 0
      }}>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 50,
          }}
        >
          <TextField
            id="tf-name"
            label="????????????"
            variant="outlined"
            fullWidth
            defaultValue={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </Box>
        <Button variant="text" onClick={() => onSearch()}>??????</Button>
      </Box>

      <TooltipComponent title={"???????????? ?????? ?????? ????????? ????????? ????????? ???????????? ???????????????. ????????? ?????? ??? ????????? ?????? ???????????? ????????? ?????????."}>
        <IconButton sx={{
          fontSize: 16
        }}>
          TAG?????? ??????
        </IconButton>
      </TooltipComponent>

    </Box>
  );
};

export default SearchComponent;