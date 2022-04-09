import React from "react";
import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { tagItems } from "../../actions/commonData";

const SelectTag = ({ tags, setTags, open, setOpen }) => {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-tag-label">Tag 선택</InputLabel>
      <Select
        labelId="select-tag-label"
        id="select-tag"
        autoWidth
        multiple
        value={tags}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        open={open}
      >
        {
          tagItems.map(tag => (
            <MenuItem key={tag.id} value={tag.value} onClick={() => setOpen(false)}>
              <Checkbox checked={tags.indexOf(tag.value) > -1} />
              <ListItemText primary={tag.label} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default SelectTag;