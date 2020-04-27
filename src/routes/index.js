import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
    </Router>
  );
}

export default Routes;