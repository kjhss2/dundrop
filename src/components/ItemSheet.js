import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import SearchItemDetailModal from "./SearchItemDetailModal";
import { searchItemDetailFetch } from "../actions/itemSearchAction";

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
            <Tooltip key={item.itemId} title={item.itemName + ' : ' + item.dropInfos} placement="top" disableInteractive>
              <Box sx={{
                opacity: item.isGetting ? '1' : '0.5',
                cursor: 'pointer'
              }}
                onClick={() => onSearchItemDetail(item.itemId)}
              >
                <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} variant="square" />
              </Box>
            </Tooltip>
          ))
        }
      </Box>
      <SearchItemDetailModal />
    </>
  );
};

export default ItemSheet;