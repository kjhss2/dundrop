import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import Guide from "../components/Guide";
import { useSelector } from "react-redux";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = () => {

  const navigate = useNavigate();
  const { isMobile } = useSelector((state) => state.dimension);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5">던드롭(DunDrop)</Typography>
        </Box>
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="h7">던전앤파이터 TAG별 아이템 드랍정보, 보유 아이템 검색 사이트</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label="소개" {...a11yProps(0)} />
            <Tab label="가이드" {...a11yProps(1)} />
            <Tab label="확인된 문제" {...a11yProps(2)} />
            <Tab label="공지사항" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={1}>
          <Guide />
        </TabPanel>
        <TabPanel value={value} index={0}>
          안녕하세요. 2006년부터 소소하게 던전앤파이터를 즐기고 있는 유저입니다.<br />
          이번에 만렙 확장과 더불어 신규 105레벨 아이템을 좀 더 쉽게 검색하는 기능을 만들고자 사이트를 개발하게 되었습니다.<br />
          <br />
          던드롭은 현재 베타로 운영중이며, 불편한 점이 있으시면 문의주시면 감사하겠습니다.<br />
          <br />
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? 1 : 0,
          }}>
            <Button
              onClick={() => navigate('/character')}
              variant="outlined"
            >
              캐릭터 검색 바로 가기
            </Button>
            &nbsp;
            <Button
              onClick={() => handleChange(null, 1)}
              variant="outlined"
            >
              사이트 사용방법 가이드 바로 가기
            </Button>
          </Box>
          <br />
          ※ 주요 기능<br />
          1. 105레벨 아이템 TAG검색 및 드랍정보<br />
          2. 캐릭터 아이템 획득여부 표시기능<br />
          3. 캐릭터 아이템 획득이력<br />
          4. 캐릭터 장착아이템 TAG요약<br />
          5. 캐릭터 획득이력 아이템 TAG요약<br />
          6. 다중 캐릭터 선택 기능(22.04.13)<br />
          <br />
          현재 사이트는 PC화면(넓이 1000px 이상)에서 최적화된 화면을 보실 수 있으며 모바일용 화면도 적용 예정입니다.
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="일부 사용자 브라우저에서 보유 아이템 여부가 출력되지 않는 현상(확인중)" secondary="2022.04.13" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText sx={{ textDecoration: 'line-through' }} primary="#같은 특수문자가 포함된 캐릭터가 검색되지 않는 현상(수정완료)" secondary="2022.04.13" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText sx={{ textDecoration: 'line-through' }} primary="상자 정가로 회득한 템이 보유 아이템에 표시 되지 않는 현상(수정완료)" secondary="2022.04.09 | 아이템 타임라인 항아리정가,초월 추가" />
            </ListItem>
            <Divider />
          </List>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="모바일 화면 가독성 업데이트 예정" secondary="2022-04-14 | 그 외에 신화 아이템 추가, 모험단 검색, 아이템만 검색 기능도 조금만 기다려주세요." />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="다중 캐릭터 획득이력 표시 기능 업데이트(완료)" secondary="2022-04-13 | 노블레스 코드용 보유 아이템 검색" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="최근 캐릭터 검색 이력 업데이트(완료)" secondary="2022-04-13" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="#크리티컬 히트 TAG 업데이트(완료)" secondary="2022-04-11 | TAG선택에는 표시 되지만 TAG요약에는 딜 관련이 아니며 해당되는 템 개수가 많아 제외 하였습니다." />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="보유 아이템 TAG요약 업데이트(완료)" secondary="2022-04-10" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="캐릭터 장착 아이템 TAG요약 업데이트(완료)" secondary="2022-04-10" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="아이템 Tag 추가(아칸셋) 업데이트(완료)" secondary="2022-04-09 | 자주 사용하는 순서대로 Tag 변경, 보유 아이템 전체 시트 Tag 필터 추가" />
            </ListItem>
            <ListItem>
              <ListItemText primary="캐릭터 검색 메뉴 업데이트(완료)" secondary="2022-04-08 | 캐릭터별 보유 아이템 표시 기능" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="아이템 검색(105렙) 업데이트(완료)" secondary="2022-04-07" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Beta 버전 작업중입니다." secondary="2022-04-01" />
            </ListItem>
            <Divider />
          </List>
        </TabPanel>
      </Box>
    </>
  );
};

export default Home;