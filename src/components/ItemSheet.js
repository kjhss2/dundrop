import React from "react";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import SearchItemDetailModal from "./SearchItemDetailModal";
import { useDispatch } from "react-redux";
import { searchItemDetailFetch } from "../actions/itemSearchAction";

const ItemSheet = ({ items, filter }) => {

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
          <Typography gutterBottom variant="h5">
            {filter}
          </Typography>
        </Box>
        {
          items.filter(item => item.itemType === filter).map(item => (
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