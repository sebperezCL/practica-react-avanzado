import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import NotFoundPage from './NotFoundPage';
import { appStart } from '../../store/ducks/app';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { appStart } = this.props;
    appStart('NodePop');
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute path="/adverts" exact>
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
        <PrivateRoute path="/adverts/:id" exact component={AdvertPage} />
        <Route path="/404" exact>
          {NotFoundPage}
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    );
  }
}

export default connect(null, { appStart })(App);
