import React from "react";
import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      style={{
        display: 'flex',
        minHeight: '50vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          display: {
            // xs: 'flex',
            // md: 'none'
          },
        }}
      >
        404 - 잘못된 접근입니다.
      </Typography>
    </Container>
  );
};

export default NotFound;