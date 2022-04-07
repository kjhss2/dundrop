import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Search } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";
import SearchItemDetailModal from "./SearchItemDetailModal";

const SearchItems = ({ items }) => {

  const dispatch = useDispatch();
  const { isRequesting } = useSelector((state) => state.commonState);
  const { isMobile } = useSelector((state) => state.dimension);

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
              items && items.map((item, index) => (
                <SearchItem key={index} item={item} onSearchItemDetail={onSearchItemDetail} isMobile={isMobile} />
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
      }
      <SearchItemDetailModal />
    </>
  );
};

const SearchItem = ({ item, onSearchItemDetail, isMobile }) => {
  const { itemId, itemName, itemType, tags, dropInfos, desc } = item;

  return (
    <>
      <ListItem sx={{
        display: isMobile ? 'block' : 'flex'
      }}>

        <Box
          sx={{
          }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
          </ListItemAvatar>
        </Box>

        <Box
          sx={{
            width: 500,
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
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {tags}
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <ListItemText
            primary={'드랍 정보'}
            sx={{
              color: '#df6a07'
            }}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {
                    dropInfos.map((info, index) => (
                      <React.Fragment key={index}>{info}</React.Fragment>
                    ))
                  }
                </Typography>
              </React.Fragment>
            }
          />
        </Box>

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