import { Box, Divider, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

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
          <Typography variant="h7">던전엔파이터 아이템 검색 사이트</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="소개" {...a11yProps(0)} />
            <Tab label="확인된 문제" {...a11yProps(1)} />
            <Tab label="공지사항" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          안녕하세요. 소소하게 던전엔파이터를 즐기고 있는 유저입니다.<br />
          110레벨 확장으로 인한 105레벨 다양한 신규 아이템이 등장하였는데요.<br />
          좀 더 편하게 105레벨 아이템을 검색 할 수 있는 사이트를 만들어 보자 해서 만들게 되었습니다.<br />
          <br />
          해당 사이트는 현재 베타로 운영중이며, 불편한 점이 있으시면 문의주시면 감사하겠습니다.<br />
          <br />
          현재 사이트는 PC화면(넓이 1000px 이상)에서 최적화된 화면을 보실 수 있으며 모바일에서도 보시기 불편함이 없게 수정 예정입니다.
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="상자 정가로 회득한 템이 보유 아이템에 표시 되지 않는 현상(수정완료)" secondary="2020.04.09 | 아이템 타임라인 항아리정가,초월 추가" />
            </ListItem>
            <Divider />
          </List>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="노블레스 코드 캐릭터별 보유 아이템 표시 기능" secondary="업데이트 예정" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="아이템 Tag 추가(아칸셋)" secondary="2022-04-09 | 자주 사용하는 순서대로 Tag 변경, 보유 아이템 전체 시트 Tag 필터 추가" />
            </ListItem>
            <Divider />
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