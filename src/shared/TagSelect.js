import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: '50ch',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TagSelect = ({ onChange, allowedTags }) => {
  const classes = useStyles();

  const [tagName, setTagName] = useState([]);

  const handleChange = event => {
    setTagName(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {allowedTags.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={tagName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

TagSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  allowedTags: PropTypes.array.isRequired,
};

export default TagSelect;
