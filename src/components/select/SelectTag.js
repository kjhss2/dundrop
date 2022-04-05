import React from "react";
import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { tagItems } from "../../actions/commonData";

const SelectTag = ({ tags, setTags }) => {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="select-tag-label">Tag</InputLabel>
        <Select
          labelId="select-tag-checkbox-label"
          id="select-tag"
          multiple
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {
            tagItems.map(tag => (
              <MenuItem key={tag.id} value={tag.value}>
                <Checkbox checked={tags.indexOf(tag.value) > -1} />
                <ListItemText primary={tag.label} />
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectTag;