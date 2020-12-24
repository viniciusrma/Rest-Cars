import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Cars from './pages/cars';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cars" exact component={Cars} />
    </Switch>
  );
};

export default Routes;
