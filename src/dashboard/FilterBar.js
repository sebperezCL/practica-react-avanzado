import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 1000,
  },
  filterForm: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    },
  },
}));

const FilterBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box marginBottom={3}>
        <Card>
          <CardContent>
            <Box>
              <form className={classes.filterForm}>
                <TextField
                  className={classes.input}
                  placeholder="Nombre artículo"
                  variant="outlined"
                />
                <TextField placeholder="Nombre artículo" variant="outlined" />
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default FilterBar;
