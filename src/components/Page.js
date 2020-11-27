import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10),
  },
}));

const Page = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
