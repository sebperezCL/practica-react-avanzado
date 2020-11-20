import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import Logo from '../components/Logo';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
  img: {
    height: 50,
  },
});

const TopBar = ({ ...props }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} elevation={0} {...props}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.img} />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
