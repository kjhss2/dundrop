import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Search } from '@mui/icons-material';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";

// Component
import { getItemRarityColor } from "../lib/CommonFunction";
import SearchItemDetailModal from "./SearchItemDetailModal";

const MountEquipments = ({ items }) => {

  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.dimension);

  const onSearchItemDetail = (id) => {
    dispatch(searchItemDetailFetch(id));
  };

  return (
    <>
      <List sx={{
        bgcolor: 'background.paper',
        overflow: 'auto',
        padding: 0,
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
      <SearchItemDetailModal />
    </>
  );
};

const SearchItem = ({ item, onSearchItemDetail, isMobile }) => {

  const { itemId, itemName, itemRarity, reinforce, refine, amplificationName, itemGradeName, slotName, growInfo, tags, dropInfos, desc } = item;
  const makeTags = tags && tags[0].split(',').map(tag => ({ label: '#' + tag }));

  return (
    <>
      <ListItem sx={{
        display: isMobile ? 'block' : 'flex',
        padding: 0,
        gap: 0,
        border: 1,
        marginBottom: 1
      }}>

        <Box sx={{
          minWidth: 80,
          textAlign: 'center',
        }}>
          <Typography
            sx={{ fontWeight: 'bold' }}
          >
            {`${slotName} `}
          </Typography>
        </Box>

        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
        </ListItemAvatar>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box>
            <ListItemText
              primary={itemName}
              sx={{
                color: getItemRarityColor(itemRarity)
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
                    {itemGradeName && `${itemGradeName}`}
                  </Typography>
                  {desc && ` | ${desc}`}
                </React.Fragment>
              }
            />
            {
              makeTags && makeTags.map((tag, index) => (
                <React.Fragment key={index}>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {tag.label}
                  </Typography>
                </React.Fragment>
              ))
            }

            {
              dropInfos &&
              <Typography
                sx={{ color: '#df6a07' }}
              >
                드랍 정보
              </Typography>
            }
            {
              dropInfos && dropInfos.map((info, index) => (
                <Typography key={index}
                  variant="body2"
                  color="text.primary"
                >
                  {info}
                </Typography>
              ))
            }
          </Box>

          <Box sx={{
            flexGrow: 1,
            textAlign: 'end',
            marginRight: 2,
          }}>
            {
              growInfo &&
              <Box>
                <Box sx={{
                }}>
                  <Typography color={'#0d0e12'} fontSize={14}>
                    {`총 피해 증가(${growInfo.total.damage})`}
                  </Typography>
                  {
                    growInfo.total.buff &&
                    <Typography color={'#0d0e12'} fontSize={14}>
                      {`총 버프력 증가(${growInfo.total.buff})`}
                    </Typography>
                  }
                </Box>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: 1,
                }}>
                  {
                    growInfo.options.map((option, index) => (
                      <Typography key={index} color={'chocolate'} fontSize={14}>
                        {`${option.level}`}{growInfo.options.length > index + 1 && ' |'}
                      </Typography>
                    ))
                  }
                </Box>
              </Box>
            }
          </Box>
        </Box>

        <Box sx={{
          minWidth: 100
        }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: amplificationName ? 'darkmagenta' : ''
            }}
          >
            {`+ ${reinforce}`}{refine > 0 && `(${refine})`}{amplificationName ? ' 증폭' : ' 강화'}
          </Typography>
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

export default MountEquipments;