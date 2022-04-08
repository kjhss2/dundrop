import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Search } from '@mui/icons-material';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";
import SearchItemDetailModal from "./SearchItemDetailModal";
import { IS_DEV } from "../config";
import LoadingView from "./LoadingView";

const SimpleSearchItems = ({ items }) => {

  const dispatch = useDispatch();

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
              <SearchItem key={index} item={item} onSearchItemDetail={onSearchItemDetail} />
            ))
          }
          {
            (items && items.length === 0) &&
            <Typography
              color="text.primary"
            >
              {'조회된 정보가 없습니다.'}
            </Typography>
          }
        </List>
      </LoadingView>
      <SearchItemDetailModal />
    </>
  );
};

const SearchItem = ({ item, onSearchItemDetail }) => {
  const { itemId, itemName, itemType, itemTypeDetail, itemRarity, itemAvailableLevel } = item;

  return (
    <>
      <ListItem alignItems="flex-start">

        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
        </ListItemAvatar>

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
                {`${itemRarity} `}
              </Typography>
              {` | ${itemType} `}
              {` | ${itemTypeDetail} `}
              {` | 레벨제한 ${itemAvailableLevel}`}
              {IS_DEV && ` | ${itemId}`}
            </React.Fragment>
          }
        />

        <ListItemIcon>
          <IconButton edge="end" aria-label="delete" onClick={() => onSearchItemDetail(itemId)}>
            <Search />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </>
  );
};

export default SimpleSearchItems;