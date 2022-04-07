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
            <Tab label="공지사항" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box>
            <Typography>안녕하세요. 소소하게 던전엔파이터를 즐기고 있는 유저입니다.</Typography>
            <Typography>110레벨 확장으로 인한 105레벨 다양한 신규 아이템이 등장하였는데요.</Typography>
            <Typography>좀 더 편하게 105레벨 아이템을 검색 할 수 있는 사이트를 만들어 보자 해서 만들게 되었습니다.</Typography>
            <br />
            <Typography>해당 사이트는 현재 베타로 운영중이며, 불편한 점이 있으시면 문의주시면 감사하겠습니다.</Typography>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="Beta 버전 작업중입니다." secondary="2022-04-05" />
            </ListItem>
            <Divider />
          </List>
        </TabPanel>
      </Box>
    </>
  );
};

export default Home;