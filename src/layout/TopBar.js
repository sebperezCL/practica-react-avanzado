import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, makeStyles, Button, Box } from '@material-ui/core';
import Logo from '../components/Logo';
import AuthContext from '../auth/context';
import { logout } from '../api/auth';

const useStyles = makeStyles({
  toolbar: {
    height: 64,
    display: 'flex',
    justifyContent: 'space-between',
  },
  img: {
    height: 50,
  },
  btnAdd: {
    marginRight: '10px',
    background: 'teal',
    color: 'white',
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
          <Box>
            <Button
              className={classes.btnAdd}
              variant="contained"
              onClick={handleLogout}
            >
              Nuevo
            </Button>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
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
