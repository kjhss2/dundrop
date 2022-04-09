import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { itemTypes } from "../../actions/commonData";

function SelectItemType({ itemType, setItemType }) {

  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">장비유형</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemType}
          label="장비유형"
          onChange={handleChange}
        >
          {
            itemTypes.map((type, index) => (
              <MenuItem key={index} value={type.value}>{type.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectItemType;