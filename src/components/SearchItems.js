import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Search, Check } from '@mui/icons-material';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";
import SearchItemDetailModal from "./SearchItemDetailModal";

// Components
import LoadingView from "./LoadingView";

const SearchItems = ({ items }) => {

  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.dimension);

  const onSearchItemDetail = (id) => {
    dispatch(searchItemDetailFetch(id));
  };

  return (
    <>
      <LoadingView>
        <List sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}>
          {
            items && items.map((item, index) => (
              <SearchItem key={index} item={item} onSearchItemDetail={onSearchItemDetail} isMobile={isMobile} />
            ))
          }
          {
            (items && items.length === 0) &&
            <Typography
              color="text.primary"
            >
              {'조회된 정보가 없습니다. 원하는 장비유형, Tag를 선택하거나 검색버튼을 클릭해 주세요.'}
            </Typography>
          }
        </List>
      </LoadingView>
      <SearchItemDetailModal />
    </>
  );
};

const SearchItem = ({ item, onSearchItemDetail, isMobile }) => {

  const { selectedTags } = useSelector((state) => state.itemSearchState);
  const { itemId, itemName, itemType, tags, dropInfos, desc, isGetting } = item;
  const makeTags = tags && tags[0].split(',').map(tag => ({ isTagMatch: selectedTags.includes(tag), label: '#' + tag }));

  return (
    <>
      <ListItem sx={{
        display: isMobile ? 'block' : 'flex',
        backgroundColor: isGetting ? 'aliceblue' : ''
      }}>

        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
        </ListItemAvatar>

        <Box
          sx={{
            width: 450,
          }}
        >
          <ListItemText
            primary={itemName}
            sx={{
              color: '#d39500'
            }}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`${itemType} `}
                </Typography>
                {` | ${desc}`}
              </React.Fragment>
            }
          />
          {
            makeTags.map((tag, index) => (
              <React.Fragment key={index}>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  fontWeight={tag.isTagMatch ? 'bold' : ''}
                >
                  {tag.label}
                </Typography>
              </React.Fragment>
            ))
          }
        </Box>

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography
            sx={{ color: '#df6a07' }}
          >
            드랍 정보
          </Typography>
          {
            dropInfos.map((info, index) => (
              <Typography key={index}
                // component="span"
                variant="body2"
                color="text.primary"
              >
                {info}
              </Typography>
            ))
          }
        </Box>

        {isGetting &&
          <Box sx={{
            display: 'flex',
          }}>
            <Check />
            <Typography
              sx={{ display: 'inline' }}
              variant="body2"
              color="text.primary"
              fontWeight={'bold'}
            >
              보유중
            </Typography>
          </Box>
        }

        <ListItemIcon>
          <IconButton edge="end" aria-label="delete" onClick={() => onSearchItemDetail(itemId)}>
            <Search />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </>
  );
};

export default SearchItems;