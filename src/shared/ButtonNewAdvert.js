import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Button } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles({
  btnAdd: {
    '&:hover': {
      color: 'black',
    },
    marginRight: '10px',
    background: 'teal',
    color: 'white',
  },
});

const ButtonNewAdvert = () => {
  const classes = useStyles();

  return (
    <RouterLink to="/newadvert">
      <Button
        className={classes.btnAdd}
        variant="contained"
        startIcon={<AddCircleOutline />}
      >
        Nuevo
      </Button>
    </RouterLink>
  );
};

export default ButtonNewAdvert;
