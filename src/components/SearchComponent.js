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

      <TooltipComponent title={"타임라인 기준 획득 하였던 아이템 이력을 바탕으로 출력됩니다. 아이템 해체 및 성장에 쓰인 아이템도 출력이 됩니다."}>
        <IconButton sx={{
          fontSize: 16
        }}>
          TAG검색 설명
        </IconButton>
      </TooltipComponent>

    </Box>
  );
};

export default SearchComponent;