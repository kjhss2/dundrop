import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Chip, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";

// Actions
import { characterSearchFetch, onChangeField, selectCharacter } from "../actions/characterAction";
import { useNavigate } from "react-router-dom";
import { getServerName } from '../lib/CommonFunction';

const CharacterSearchComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [charName, setCharName] = React.useState('');
  const { characterSearchHistory, selectedCharacters } = useSelector((state) => state.characterState);
  const { isMobile } = useSelector((state) => state.dimension);

  const onSearch = () => {
    dispatch(characterSearchFetch(charName));
  };

  const removeSession = () => {
    window.sessionStorage.removeItem('characterSearchHistory');
    dispatch(onChangeField('characterSearchHistory', ''));
  };

  return (
    <Box
      sx={{
        display: isMobile ? 'block' : 'flex',
      }}
    >
      <Box sx={{
        flexGrow: 1,
      }}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center'
          }}>
            <TextField
              id="outlined-basic"
              label="캐릭터 검색"
              variant="outlined"
              fullWidth
              onChange={(e) => setCharName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
          </Box>

          <Box sx={{
            flexGrow: 1,
            display: 'flex',
          }}>
            <Button variant="text" onClick={onSearch}>검색</Button>
          </Box>
        </Box>

        {
          characterSearchHistory &&
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: 1,
            gap: 1,
          }}>
            <Box>
              <Typography>최근 검색 이력</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1
            }}>
              {
                characterSearchHistory && characterSearchHistory.split(',').map((history, index) => (
                  <Chip
                    key={`history-${index}`}
                    label={history}
                    onClick={() => dispatch(characterSearchFetch(history))}
                  />
                ))
              }
              <Button variant="contained" color="primary" onClick={removeSession}>검색 이력 초기화</Button>
            </Box>
          </Box>
        }
      </Box>

      {
        <Box sx={{
          flexGrow: 1,
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography variant="h6">다중 캐릭터 목록(최대 4캐릭)</Typography>
            <Tooltip title="노블레스 코드용 선택한 캐릭터 아이템 획득이력 여부 표시" placement="top">
              <IconButton sx={{
                fontSize: 16
              }}>
                다중 캐릭터란 ?
              </IconButton>
            </Tooltip>
          </Box>

          <Stack direction="row" spacing={1}>
            {
              selectedCharacters && selectedCharacters.map((c) => (
                <Chip
                  key={c.characterId}
                  label={`[${getServerName(c.serverId)}] ${c.characterName}`}
                  onClick={() => navigate(`/character/${c.serverId}/${c.characterId}`)}
                  onDelete={() => dispatch(selectCharacter(false, c.serverId, c.characterId))}
                />
              ))
            }
          </Stack>
          {
            selectedCharacters && selectedCharacters.length === 0 &&
            <Typography variant="h7">캐릭터 검색 후 다중 캐릭터를 선택해 주세요.</Typography>
          }
        </Box>
      }
    </Box>
  );
};

export default CharacterSearchComponent;;