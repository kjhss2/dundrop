import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import Guide from "../components/Guide";

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

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

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
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
          이번에 만렙 확장과 더불어 신규 105레벨 아이템을 좀 더 쉽게 검색하는 기능을 만들고자 사이트를 개발 하게 되었습니다.<br />
          개발을 시작한지 얼마 안되서 부족한 점이 많지만 필요한 기능들을 추가할 예정입니다.<br />
          던드롭은 현재 베타로 운영중이며, 불편한 점이 있으시면 문의주시면 감사하겠습니다.<br />
          <br />
          ※ 주요 기능<br />
          1. 105렙 아이템 Tag 검색 및 드랍 정보<br />
          2. 보유 중인 아이템 표시 기능<br />
          3. 캐릭터 아이템 획득 이력<br />
          4. 캐릭터 장착 아이템 TAG 요약(22.04.10)<br />
          5. 캐릭터 보유 아이템 TAG 요약(22.04.10)<br />
          <br />
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
          <br />
          <br />
          현재 사이트는 PC화면(넓이 1000px 이상)에서 최적화된 화면을 보실 수 있으며 모바일에서도 보시기 불편함이 없게 수정 예정입니다.
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="상자 정가로 회득한 템이 보유 아이템에 표시 되지 않는 현상(수정완료)" secondary="2020.04.09 | 아이템 타임라인 항아리정가,초월 추가" />
            </ListItem>
            <Divider />
          </List>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="노블레스 코드 캐릭터별 보유 아이템 표시 기능" secondary="업데이트 예정" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="보유 아이템 TAG 요약 업데이트" secondary="2022-04-10" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="캐릭터 장착 아이템 TAG 요약 업데이트" secondary="2022-04-10" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="아이템 Tag 추가(아칸셋) 업데이트" secondary="2022-04-09 | 자주 사용하는 순서대로 Tag 변경, 보유 아이템 전체 시트 Tag 필터 추가" />
            </ListItem>
            <ListItem>
              <ListItemText primary="캐릭터 검색 메뉴 업데이트" secondary="2022-04-08 | 캐릭터별 보유 아이템 표시 기능" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="아이템 검색(105렙) 업데이트" secondary="2022-04-07" />
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