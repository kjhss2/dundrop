import React from "react";
import { Container, Typography } from "@mui/material";

// Components
import logo from '../lib/img/neople_api_logo.png';

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img
          style={{ cursor: 'pointer' }}
          src={logo}
          alt="Neople 오픈 API"
          onClick={() => window.open('https://developers.neople.co.kr')}
        />
        <Typography
          variant="h7"
          component="div"
          sx={{
            // flexGrow: 1,
            display: {
              // xs: 'flex',
              // md: 'none'
            },
          }}
        >
          {'오류 & 건의 문의 : kjhss2@nate.com'}
        </Typography>
      </div>
    </Container>
  );
};

export default Footer;