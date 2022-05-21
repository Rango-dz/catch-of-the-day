import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app';
import Storepicker from './storepicker';
import notfound from './notfound';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Storepicker} />
          <Route path="/store/:storeId" component={App} />
          <Route component={notfound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router;