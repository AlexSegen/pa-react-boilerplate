import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Private from './pages/Private';

import Login from  './pages/Login';

const MainRouter = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/private">
            <Private />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default MainRouter;