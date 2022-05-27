import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Chip, IconButton, TextField, Typography } from "@mui/material";
import ReactGA from "react-ga";

// Actions
import { characterSearchFetch, onChangeField, selectCharacter } from "../actions/characterAction";
import { getServerName } from '../lib/CommonFunction';
import TooltipComponent from './TooltipComponent';

const CharacterSearchComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [charName, setCharName] = React.useState('');
  const { characterSearchHistory, selectedCharacters } = useSelector((state) => state.characterState);
  const { isMobile } = useSelector((state) => state.dimension);

  const onSearch = () => {
    dispatch(characterSearchFetch(charName));

    // React Google Analytics Event(캐릭터명 검색 수집)
    ReactGA.event({
      category: "Search",
      action: charName,
      label: "Button",
    });
  };

  const removeSession = () => {
    window.localStorage.removeItem('characterSearchHistory');
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
          marginTop: isMobile ? 2 : 0,
        }}>
          <Box sx={{
            display: isMobile ? 'block' : 'flex',
            alignItems: 'center',
            gap: 1,
            marginBottom: isMobile ? 1 : 0
          }}>
            <Typography variant="h6">다중 캐릭터 목록(최대 4캐릭)</Typography>
            <TooltipComponent title={'노블레스 코드용 선택한 캐릭터 아이템 획득이력 여부 표시'}>
              <IconButton sx={{ fontSize: 16 }}>
                다중 캐릭터란 ?
              </IconButton>
            </TooltipComponent>
          </Box>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
          >
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
          </Box>
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