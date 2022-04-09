import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, Modal, TextareaAutosize, Typography } from "@mui/material";

// Actions
import { onChangeField } from "../actions/itemSearchAction";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SearchItemDetailModal = () => {

  const dispatch = useDispatch();
  const { width, height } = useSelector((state) => state.dimension);
  const { searchItem } = useSelector((state) => state.itemSearchState);
  const { itemId, itemName, itemAvailableLevel, itemExplain, growInfo, itemObtainInfo } = searchItem;

  const handleClose = () => {
    dispatch(onChangeField('searchItem', {}));
  };

  return (
    <Modal
      open={(searchItem && searchItem.itemId) ? true : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={[style, { height: (height * 0.8), overflow: 'auto' }]}>

        <Button
          onClick={handleClose}
          fullWidth
          variant="outlined"
        >
          닫기
        </Button>

        <Box sx={{ display: 'flex', marginTop: 1 }}>
          <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            &nbsp;<Typography>{itemName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography>레벨제한 : {itemAvailableLevel}</Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Typography>{itemExplain}</Typography>
        </Box>

        {
          (growInfo && growInfo.total) &&
          <>
            <Box sx={{ marginTop: 2 }}>
              <Typography>{`성장 옵션 총 피해 증가 ${growInfo.total.damage}`}</Typography>
              {
                growInfo.total.buff &&
                <Typography>{`성장 옵션 총 버프력 증가 ${growInfo.total.buff}`}</Typography>
              }
            </Box>
          </>
        }

        {
          (growInfo && growInfo.options) &&
          <>
            <Box>
              {
                growInfo.options.map((option, index) => (
                  <Box key={index} sx={{ marginTop: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography>{`${index + 1}옵션 - Lv(${option.level || ' - '})`}&nbsp;</Typography>
                      <Typography>{`| 피해 증가 ${option.damage || '-'}`}&nbsp;</Typography>
                      {
                        option.buff &&
                        <Typography>{`| 버프력 ${option.buff}`}</Typography>
                      }
                    </Box>
                    <Typography
                      variant="body2"
                      color="cadetblue"
                    >
                      {`${option.explain}`}
                    </Typography>
                  </Box>
                ))
              }
            </Box>
          </>
        }

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">{`획득 정보`}</Typography>
          <TextareaAutosize
            aria-label="empty textarea"
            disabled
            style={{ minWidth: (width * 0.8) }}
            defaultValue={itemObtainInfo}
          />
        </Box>
        <Button
          onClick={handleClose}
          fullWidth
          variant="outlined"
        >
          닫기
        </Button>
      </Box>
    </Modal>
  );
};

export default SearchItemDetailModal;