import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

// Imports
import { getServerName } from "../lib/CommonFunction";
import LoadingView from "./LoadingView";
import SearchItemDetailModal from "./SearchItemDetailModal";
import { selectCharacter } from "../actions/characterAction";

const CharacterItems = () => {

  const { isMobile } = useSelector((state) => state.dimension);
  const { characters } = useSelector((state) => state.characterState);

  return (
    <>
      <LoadingView>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          p: 1,
        }}>
          {
            characters && characters.map((item, index) => (
              <SearchItem key={index} item={item} isMobile={isMobile} />
            ))
          }
          {
            (characters && characters.length === 0) &&
            <Typography
              color="text.primary"
            >
              {'조회된 정보가 없습니다.'}
            </Typography>
          }
        </Box>
      </LoadingView>
      <SearchItemDetailModal />
    </>
  );
};

const SearchItem = ({ item, isMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCharacters } = useSelector((state) => state.characterState);
  const { serverId, characterId, characterName, jobGrowName, level } = item;
  const [checked, setChecked] = React.useState(false);

  const onSelectCharacter = (event) => {
    dispatch(selectCharacter(event.target.checked, serverId, characterId, characterName, navigate));
  };

  const checkSelectedCharacter = () => {
    setChecked(false);
    selectedCharacters && selectedCharacters.forEach(c => {
      if (c.serverId === serverId && c.characterId === characterId) {
        setChecked(true);
      }
    });
  };

  React.useEffect(() => {
    checkSelectedCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, selectedCharacters]);// 아이템 목록과 다중 캐릭터 선택 변경 시 업데이트

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{
        backgroundColor: '#d3d3d3',
      }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={checked} />} onChange={onSelectCharacter} label="다중 캐릭터 선택" />
        </FormGroup>
      </CardContent>

      <CardActionArea sx={{
        display: isMobile ? 'flex' : ''
      }}
        onClick={() => navigate(`/character/${serverId}/${characterId}`)}
      >
        <CardMedia
          sx={{
            maxWidth: isMobile ? 150 : 250
          }}
          component="img"
          image={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=1`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom fontWeight={'bold'} fontSize={isMobile ? 17 : 19} component="div">
            {characterName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`서버 : ${getServerName(serverId)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`직업 : ${jobGrowName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`레벨 : ${level}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterItems;