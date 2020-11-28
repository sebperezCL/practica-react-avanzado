import React from 'react';
import { Box, SvgIcon } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const Logo = () => {
  return (
    <Box>
      <SvgIcon
        style={{ color: 'white', fontSize: '40' }}
        component={HomeIcon}
      />
    </Box>
  );
};

export default Logo;
