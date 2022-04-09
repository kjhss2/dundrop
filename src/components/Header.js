import React from "react";
import { useNavigate, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";

const menus = [
  { title: '캐릭터 검색', url: '/character', active: true },
  { title: '아이템 검색(Tag)', url: '/search105', active: false },
  { title: '아이템 검색', url: '/search', active: false },
];

const Header = () => {
  const navigate = useNavigate();
  const { isMobile } = useSelector((state) => state.dimension);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Button
              onClick={() => navigate("/")}
              sx={{ color: 'white', display: 'block', fontSize: 17 }}
            >
              DunDrop{isMobile && <br />}(Beta)
            </Button>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex' },
                // display: { xs: 'flex', md: 'none' },
                justifyContent: 'center'
              }}>
              {menus.filter(menu => menu.active).map((menu, index) => (
                <MenuItem key={index} title={menu.title} url={menu.url} />
              ))}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

const MenuItem = ({ title, url }) => {
  const navigate = useNavigate();
  const resolved = useResolvedPath(url);
  const match = useMatch({ path: resolved.pathname, end: true });

  const activeStyle = {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  };

  return (
    <Button
      sx={[
        {
          my: 1,
          color: 'white',
          fontSize: 15,
        },
        match && activeStyle
      ]}
      onClick={() => navigate(url)}
    >
      {title}
    </Button>
  );
};

export default Header;