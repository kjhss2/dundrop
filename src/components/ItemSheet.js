import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

// Actions
import { searchItemDetailFetch } from "../actions/itemSearchAction";

// Components
import SearchItemDetailModal from "./SearchItemDetailModal";
import TooltipComponent from "./TooltipComponent";

const ItemSheet = ({ items, filter, tags }) => {

  const dispatch = useDispatch();

  const onSearchItemDetail = (id) => {
    dispatch(searchItemDetailFetch(id));
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 1,
      }}>
        <Box sx={{
          minWidth: 100,
        }}>
          <Typography gutterBottom>
            {filter}
          </Typography>
        </Box>
        {
          items.filter(item => {
            if (item.itemType === filter) {
              let matchCount = tags.length;
              // 선택된 Tag 시트 표시
              tags.forEach(tag => {
                if (item.tags[0].includes(tag)) {
                  matchCount--;
                }
              });
              return matchCount < 1;
            } else {
              return false;
            }
          }).map(item => (
            <TooltipComponent key={item.itemId} title={(item.isCore ? `★${item.isCoreDesc}★` : '') + item.itemName + (item.dropInfos ? `: ${item.dropInfos}` : '')}>
              <Box sx={{
                cursor: 'pointer',
              }}
                onClick={() => onSearchItemDetail(item.itemId)}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  badgeContent={
                    item.isCore ?
                      <Star color={"error"} />
                      : 0
                  }
                >
                  <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} variant="square" sx={{
                    opacity: item.isGetting ? 1 : 0.5,
                  }} />
                </Badge>
              </Box>
            </TooltipComponent>
          ))
        }
      </Box>
      <SearchItemDetailModal />
    </>
  );
};

export default ItemSheet;