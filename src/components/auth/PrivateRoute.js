import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../store/ducks/auth';

const PrivateRoute = props => {
  const user = useSelector(getUser);
  const location = useLocation();
  return user ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
