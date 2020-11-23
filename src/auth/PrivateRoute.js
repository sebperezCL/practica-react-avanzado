import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from './context';

const PrivateRoute = (props) => {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? <Route {...props} /> : <Redirect to="/" />;
};
export default PrivateRoute;
