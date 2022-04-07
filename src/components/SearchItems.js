import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Search } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";
import SearchItemDetailModal from "./SearchItemDetailModal";
import { IS_DEV } from "../config";

const SearchItems = () => {

  const dispatch = useDispatch();
  const { searchItems } = useSelector((state) => state.itemSearchState);
  const { isRequesting } = useSelector((state) => state.commonState);

  const onSearchItemDetail = (id) => {
    dispatch(searchItemDetailFetch(id));
  };

  return (
    <>
      {
        isRequesting ?
          <Box sx={{
            display: 'flex',
            p: 1,
            gap: 1
          }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{
              flexGrow: 1
            }}>
              <Skeleton variant="text" animation="wave" width={'100%'} />
              <Skeleton variant="text" animation="wave" width={'100%'} />
            </Box>
          </Box>
          :
          <List sx={{
            bgcolor: 'background.paper',
            overflow: 'auto',
            // maxHeight: '60vh'
          }}>
            {
              searchItems && searchItems.map((item, index) => (
                <SearchItem key={index} item={item} onSearchItemDetail={onSearchItemDetail} />
              ))
            }
            {
              (searchItems && searchItems.length === 0) &&
              <Typography
                color="text.primary"
              >
                {'조회된 정보가 없습니다.'}
              </Typography>
            }
          </List>
      }
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

export default SearchItems;