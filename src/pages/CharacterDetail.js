import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, FormControlLabel, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Switch, Tab, Tabs, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

// Actions
import { characterEquipmentSearchFetch, characterInfoFetch, characterTimelineFetch, initCharacter } from "../actions/characterAction";
import { initSearchItems, searchItemDetailFetch } from '../actions/itemSearchAction';
import { getItemRarityColor, getServerName } from '../lib/CommonFunction';

// Components
import SearchItemDetailModal from '../components/SearchItemDetailModal';
import ItemSearch105 from './ItemSearch105';
import ItemSheet from '../components/ItemSheet';
import LoadingView from '../components/LoadingView';
import SelectTag from '../components/select/SelectTag';
import { allItems, itemTypes } from '../actions/commonData';
import MountEquipments from '../components/MountEquipments';

const CharacterDetail = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.dimension);
  const { character, tagEquipmentSummary, timeline, allEquipment } = useSelector((state) => state.characterState);

  React.useEffect(() => {
    dispatch(characterInfoFetch(params.serverId, params.characterId));
    dispatch(characterEquipmentSearchFetch(params.serverId, params.characterId));
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
      <LoadingView>
        <Box sx={{
          display: isMobile ? '' : 'flex',
          gap: 1
        }}>
          {/* 캐릭터 정보 */}
          <Box sx={{
            maxWidth: isMobile ? 180 : 240
          }}>
            {
              character &&
              <CharacterInfo info={character} serverId={params.serverId} tagEquipmentSummary={tagEquipmentSummary} />
            }
          </Box>

          {/* 아이템 Tabs */}
          <Box sx={{
            flexGrow: 1
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="장착 아이템" {...a11yProps(0)} />
                <Tab label="보유 아이템 전체 시트" {...a11yProps(1)} />
                <Tab label="Tag 검색" {...a11yProps(2)} />
                <Tab label="아이템 획득 이력" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <MountEquipments items={allEquipment} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ItemSheets tagEquipmentSummary={tagEquipmentSummary} isMobile={isMobile} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ItemSearch105 />
            </TabPanel>
            <TabPanel value={value} index={3}>
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
          </Box>

        </Box>
      </LoadingView>
      <SearchItemDetailModal isMobile={isMobile} />
    </>
  );
};

// 캐릭터 정보
const CharacterInfo = ({ serverId, info, tagEquipmentSummary }) => {

  const navigate = useNavigate();
  const { characterId, characterName, jobGrowName, level, guildName, adventureName, status } = info;

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/character/${serverId}/${characterId}`)}>
        <CardMedia
          component="img"
          image={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {characterName}
          </Typography>
          <Box>
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
            <Typography color="text.secondary" fontWeight={'bold'} fontSize={16}>
              {`명성 : ${status.filter(s => s.name === '모험가 명성').map(s => s.value)}`}
            </Typography>
          </Box>
          {
            tagEquipmentSummary && tagEquipmentSummary.length > 0 &&
            <Box
              sx={{
                marginTop: 2
              }}>
              <Typography variant="h6">
                {`장착 아이템 TAG 요약`}
              </Typography>
              {
                tagEquipmentSummary.map((item, index) => {
                  return (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {`#${item.name}(${item.value})`}
                    </Typography>
                  );
                })
              }
            </Box>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// 보유 아이템 전체 시트
const ItemSheets = ({ isMobile }) => {
  let filteredItems = allItems;

  const [tags, setTags] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [allTagsSummary, setAllTagsSummary] = React.useState([]);

  React.useEffect(() => {
    makeAllTagSummray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems]);

  const onSetTags = (_tags) => {
    setTags(_tags);
  };

  const makeAllTagSummray = () => {

    let _allTagsSummary = new Map();

    allItems.filter(item => item.isGetting).forEach(item => {
      // 장착 장비 Tag 요약 정보 획득
      item.tags[0].split(',').forEach(tag => {
        // 이미 tag가 존재하면 카운터 추가, 없다면 신규 set 추가
        if (_allTagsSummary.has(tag)) {
          const getTag = _allTagsSummary.get(tag);
          _allTagsSummary.delete(tag);
          _allTagsSummary.set(tag, getTag + 1);
        } else {
          _allTagsSummary.set(tag, 1);
        }
      });
    });
    // map to array
    _allTagsSummary = Array.from(_allTagsSummary, ([name, value]) => ({ name, value }));
    // 장착 장비 Tag 요약 정보 정렬(sort)
    _allTagsSummary.sort(({ value }, { value: bValue }) => bValue - value);
    setAllTagsSummary(_allTagsSummary);
  };

  return (
    <>
      <Box sx={{
        justifyContent: 'center',
        width: '50%',
      }}>
        <Box onClick={() => setOpen(!open)}>
          <SelectTag tags={tags} setTags={onSetTags} open={open} setOpen={setOpen} />
        </Box>
        <FormControlLabel control={
          <Switch
            defaultChecked
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        } label="TAG 요약 숨기기" />
      </Box>
      <Box sx={{
        display: isMobile ? 'block' : 'flex',
        gap: 1.5,
      }}>
        <Box>
          {
            itemTypes.filter(type => type.value !== 'ALL').map((type, index) => (
              <ItemSheet key={index} filter={type.value} items={filteredItems} tags={tags} />
            ))
          }
        </Box>
        <Box sx={{
          display: checked ? 'none' : ''
        }}>
          <Typography fontWeight={'bold'} fontSize={16}>
            {`보유 아이템 TAG 요약`}
          </Typography>
          {
            allTagsSummary.map((item, index) => {
              return (
                <Typography key={index} variant="body2" color="text.secondary">
                  {`#${item.name}(${item.value})`}
                </Typography>
              );
            })
          }
        </Box>
      </Box>
    </>
  );
};

// 아이템 획득 이력
const SearchItem = ({ item, onSearchItemDetail, isMobile }) => {
  const { name, date, data: { itemId, itemRarity, itemName, channelName, channelNo, dungeonName } } = item;

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
            color: getItemRarityColor(itemRarity)
          }}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`${itemRarity} | `}
                {`획득일 : ${date} `}
                {channelName && ` | 채널 : ${channelName}`}
                {channelNo && `(${channelNo})`}
              </Typography>
              {dungeonName && ` | ${dungeonName}`}
              {` | ${name || ''}`}
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

// for Tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// for Tabs
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

export default CharacterDetail;