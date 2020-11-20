import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from '../components/GlobalStyles';
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
