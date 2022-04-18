import React from "react";
import { useSelector } from "react-redux";
import { Box, ClickAwayListener, Tooltip } from "@mui/material";

const TooltipComponent = ({ title, children }) => {

  const [open, setOpen] = React.useState(false);
  const { isMobile } = useSelector((state) => state.dimension);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {
        isMobile ?
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Box>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                // disableHoverListener
                disableTouchListener
                onClick={handleTooltipOpen}
                placement="top"
                title={title}
              >
                {children}
              </Tooltip>
            </Box>
          </ClickAwayListener>
          :
          <Tooltip title={title} placement="top" disableInteractive >
            {children}
          </Tooltip>
      }
    </>
  );
};

export default TooltipComponent;