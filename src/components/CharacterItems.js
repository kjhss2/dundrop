import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

// Imports
import { getServerName } from "../lib/CommonFunction";
import LoadingView from "./LoadingView";
import SearchItemDetailModal from "./SearchItemDetailModal";

const CharacterItems = () => {

  const { isMobile } = useSelector((state) => state.dimension);
  const { characters } = useSelector((state) => state.characterState);

  return (
    <>
      <LoadingView>
        <Box sx={{
          display: isMobile ? '' : 'flex',
          flexWrap: 'wrap',
          gap: 1,
          p: 1,
        }}>
          {
            characters && characters.map((item, index) => (
              <SearchItem key={index} item={item} />
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

const SearchItem = ({ item }) => {
  const navigate = useNavigate();
  const { serverId, characterId, characterName, jobGrowName, level } = item;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/character/${serverId}/${characterId}`)}>
        <CardMedia
          component="img"
          image={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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