import React from "react";
import { Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

const LoadingView = ({ children }) => {
  const { isRequesting } = useSelector((state) => state.commonState);
  return (
    <>
      {
        isRequesting ?
          <Box sx={{
            display: 'flex',
            p: 1,
            gap: 1
          }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{
              flexGrow: 1
            }}>
              <Skeleton variant="text" animation="wave" width={'100%'} />
              <Skeleton variant="text" animation="wave" width={'100%'} />
            </Box>
          </Box>
          :
          children
      }
    </>
  );
};

export default LoadingView;