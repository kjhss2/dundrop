import React from "react";
import { useNavigate, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";

const menus = [
  { title: '아이템 검색', url: '/search' },
  { title: '아이템 검색2', url: '/search2' },
];

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Button
              onClick={() => navigate("/")}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: 22 }}
            >
              DunDrop
            </Button>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex' },
                // display: { xs: 'flex', md: 'none' }
                justifyContent: 'center'
              }}>
              {menus.map((menu, index) => (
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
    // color: 'green',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  };

  return (
    <Button
      sx={[
        {
          my: 2,
          color: 'white',
          fontSize: 18,
          marginRight: 3,
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