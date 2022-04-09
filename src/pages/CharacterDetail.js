import { Search } from '@mui/icons-material';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Actions
import { characterTimelineFetch, initCharacter } from "../actions/characterAction";
import { initSearchItems, searchItemDetailFetch } from '../actions/itemSearchAction';

// Components
import { getServerName } from '../lib/CommonFunction';
import Loading from '../components/LoadingView';
import SearchItemDetailModal from '../components/SearchItemDetailModal';
import ItemSearch105 from './ItemSearch105';
import { allItems, itemTypes } from '../actions/commonData';
import ItemSheet from '../components/ItemSheet';
import LoadingView from '../components/LoadingView';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const CharacterDetail = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.dimension);
  const { character, timeline } = useSelector((state) => state.characterState);

  React.useEffect(() => {
    dispatch(characterTimelineFetch(params.serverId, params.characterId));
    dispatch(initSearchItems());
    return () => { // cleanup
      dispatch(initSearchItems());
      dispatch(initCharacter());
    };
  }, [dispatch, params]);

  const onSearchItemDetail = (id) => {
    dispatch(searchItemDetailFetch(id));
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Loading>
        <Box sx={{
          display: isMobile ? '' : 'flex',
          gap: 1
        }}>
          {/* 캐릭터 정보 */}
          <Box sx={{
            maxWidth: isMobile ? 200 : 300
          }}>
            {
              character &&
              <CharacterInfo info={character} serverId={params.serverId} />
            }
          </Box>

          {/* 아이템 Tab */}
          <Box sx={{
            flexGrow: 1
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="보유 아이템 검색" {...a11yProps(0)} />
                <Tab label="보유 아이템 전체 시트" {...a11yProps(1)} />
                <Tab label="아이템 획득 이력" {...a11yProps(2)} />
                <Tab label="장착 아이템(준비중)" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <ItemSearch105 />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ItemSheets />
            </TabPanel>
            <TabPanel value={value} index={2}>
              {
                timeline.map((row, index) => (
                  <SearchItem key={index} item={row} onSearchItemDetail={onSearchItemDetail} isMobile={isMobile} />
                ))
              }
              {
                (timeline.length === 0) &&
                <Typography
                  color="text.primary"
                >
                  {'조회된 정보가 없습니다.'}
                </Typography>
              }
            </TabPanel>
            <TabPanel value={value} index={3}>
              준비중 입니다.
            </TabPanel>
          </Box>

        </Box>
      </Loading>
      <SearchItemDetailModal isMobile={isMobile} />
    </>
  );
};

const CharacterInfo = ({ serverId, info }) => {
  const navigate = useNavigate();
  const { characterId, characterName, jobGrowName, level, guildName, adventureName } = info;

  return (
    <Card>
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
            {`모험단 : ${adventureName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`서버 : ${getServerName(serverId)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`길드 : ${guildName || ''}`}
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

const ItemSheets = () => {
  let filteredItems = allItems;
  return (
    <LoadingView>
      {
        itemTypes.filter(type => type.value !== 'ALL').map((type, index) => (
          <ItemSheet key={index} filter={type.value} items={filteredItems} />
        ))
      }
    </LoadingView>
  );
};

const SearchItem = ({ item, onSearchItemDetail, isMobile }) => {
  const { date, data: { itemId, itemName, channelName, channelNo, dungeonName } } = item;

  return (
    <ListItem sx={{
      display: isMobile ? 'block' : 'flex'
    }}>

      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={`https://img-api.neople.co.kr/df/items/${itemId}`} variant="square" />
      </ListItemAvatar>

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <ListItemText
          primary={itemName}
          sx={{
            color: '#d39500'
          }}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`획득일 : ${date} | `}
                {`채널 : ${channelName}(${channelNo}) `}
              </Typography>
              {` | ${dungeonName}`}
            </React.Fragment>
          }
        />
      </Box>

      <ListItemIcon>
        <IconButton edge="end" aria-label="delete" onClick={() => onSearchItemDetail(itemId)}>
          <Search />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default CharacterDetail;