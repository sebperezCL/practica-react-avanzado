import React from 'react';
import { Box } from '@material-ui/core';

const Logo = (props) => {
  return (
    <Box>
      <img alt="Logo" src="/img/logo192.png" {...props} />
    </Box>
  );
};

export default Logo;
