import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import Logo from '../components/Logo';
import AuthContext from '../auth/context';
import { logout } from '../api/auth';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
    display: 'flex',
    justifyContent: 'space-between',
  },
  img: {
    height: 50,
  },
});

const TopBar = ({ ...props }) => {
  const { isLogged, onLogout } = useContext(AuthContext);

  const classes = useStyles();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <AppBar className={classes.root} elevation={0} {...props}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.img} />
        </RouterLink>
        {isLogged ? (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          ''
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
