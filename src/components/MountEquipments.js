import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Box, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { Search, Star } from '@mui/icons-material';

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";

// Component
import { getItemRarityColor, numberWithCommas } from "../lib/CommonFunction";
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

  const { itemId, itemName, itemRarity, reinforce, refine, amplificationName, itemGradeName, slotName, enchant, growInfo, tags, dropInfos, desc, isCore, isCoreDesc } = item;
  const makeTags = tags && tags[0].split(',').map(tag => ({ label: '#' + tag }));

  return (
    <>
      <ListItem sx={{
        display: isMobile ? 'block' : 'flex',
        padding: 0,
        border: 1,
        marginBottom: 1,
      }}>

        <Box sx={{
          display: 'flex',
          flexGrow: 1,
        }}>
          {/* 장비유형/장비 이미지 */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
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

            <ListItemAvatar sx={{
              textAlign: 'center',
              justifyContent: 'center',
            }}>
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
          </Box>

          {/* 아이템 정보 */}
          <Box
            sx={{
              flexGrow: 1,
              display: isMobile ? 'block' : 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              textAlign: isMobile ? 'end' : '',
              marginRight: 2
            }}
          >
            <Box sx={{
              flexWrap: 'wrap',
            }}>
              <ListItemText
                primary={itemName}
                sx={{
                  color: getItemRarityColor(itemRarity),
                }}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color={getItemRarityColor(itemRarity)}
                    >
                      {`${itemRarity} `}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {itemGradeName && `${itemGradeName}`}
                    </Typography>
                    {desc && ` | ${desc}`}
                  </React.Fragment>
                }
              />
              <Box sx={{
                textAlign: isMobile ? 'end' : '',
                marginBottom: isMobile ? 1 : 0,
              }}>
                {
                  dropInfos &&
                  <Typography
                    sx={{
                      color: '#853333',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    {dropInfos.toString()}
                  </Typography>
                }
                {
                  makeTags && makeTags.map((tag, index) => (
                    <React.Fragment key={index}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {tag.label}
                      </Typography>
                    </React.Fragment>
                  ))
                }
              </Box>
            </Box>

            <Box sx={{
              flexGrow: 1,
              flexWrap: 'wrap',
              textAlign: 'end',
              marginRight: isMobile ? 0 : 2,
            }}>
              {enchant && enchant.status && enchant.status.map((en, index) => (
                <Typography key={index} color={'#1976d2'} fontSize={14}>
                  {`${en.name + ' ' + en.value}`}
                </Typography>
              ))
              }
            </Box>

            <Box sx={{
              textAlign: 'end',
              marginRight: isMobile ? 0 : 2,
            }}>
              {
                growInfo &&
                <Box sx={{
                }}>
                  <Box sx={{
                  }}>
                    <Typography color={'#0d0e12'} fontSize={14}>
                      {`총 피해 증가(${numberWithCommas(growInfo.total.damage)})`}
                    </Typography>
                    {
                      growInfo.total.buff &&
                      <Typography color={'#0d0e12'} fontSize={14}>
                        {`총 버프력 증가(${numberWithCommas(growInfo.total.buff)})`}
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
        </Box>

        {/* 강화/증폭 */}
        <Box sx={{
          minWidth: 70,
          textAlign: 'end',
          marginRight: 2,
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

        {/* 서치 아이콘 */}
        <Box sx={{
          textAlign: 'end',
        }}>
          <ListItemIcon>
            <IconButton edge="end" aria-label="delete" onClick={() => onSearchItemDetail(itemId)}>
              <Search />
            </IconButton>
          </ListItemIcon>
        </Box>
      </ListItem>
    </>
  );
};

export default MountEquipments;