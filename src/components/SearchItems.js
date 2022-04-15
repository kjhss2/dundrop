import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Box, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { Search, Check, Done, Close, Star } from '@mui/icons-material';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";
import SearchItemDetailModal from "./SearchItemDetailModal";

// Components
import LoadingView from "./LoadingView";
import { getItemRarityColor } from "../lib/CommonFunction";

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
        }}
          dense={true}
        >
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
  const { itemId, itemName, itemType, tags, dropInfos, desc, isGetting, selectedCharactersGettting, isCore, isCoreDesc } = item;
  const makeTags = tags && tags[0].split(',').map(tag => ({ isTagMatch: selectedTags.includes(tag), label: '#' + tag }));

  return (
    <>
      <ListItem sx={{
        display: isMobile ? 'block' : 'flex',
        backgroundColor: isGetting ? 'aliceblue' : '',
        border: 1,
        marginBottom: 1
      }}
      >

        <ListItemAvatar>
          <Tooltip title={(isCore ? `★${isCoreDesc}★` : '')} placement="top" disableInteractive>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              badgeContent={
                isCore ?
                  <Star color={"error"} />
                  : 0
              }
            >
              <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
            </Badge>
          </Tooltip>
        </ListItemAvatar>

        <Box
          sx={{
            width: 450,
          }}
        >
          <ListItemText
            primary={itemName}
            sx={{
              color: getItemRarityColor('에픽')
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

        {(isGetting) &&
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 1,
          }}>
            <Check />
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'end'
              }}
              variant="body2"
              color="text.primary"
              fontWeight={'bold'}
            >
              검색 캐릭터 <br /> 획득이력 존재
            </Typography>
          </Box>
        }

        <Stack spacing={1}>
          {
            selectedCharactersGettting && selectedCharactersGettting.map((info, index) => (
              <Chip
                sx={{
                  fontWeight: info.isGetting ? 'bold' : '',
                  color: info.isGetting ? 'green' : 'gray',
                }}
                key={`getting-${index}`}
                label={`${info.characterName}`}
                onDelete={() => { }}
                deleteIcon={info.isGetting ? <Done /> : <Close />}
              />
            ))
          }
        </Stack>

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