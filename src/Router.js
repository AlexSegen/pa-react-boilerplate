import React from "react";
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Private from './pages/Private';

import Login from  './pages/Login';
import Register from  './pages/Register';

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
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/private">
            <Private />
          </PrivateRoute>
          <NoAuthOnlyRoute path="/login">
            <Login />
          </NoAuthOnlyRoute>
          <NoAuthOnlyRoute path="/register">
            <Register />
          </NoAuthOnlyRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  
  const { isAuthenticated } = useSelector(state => state.auth);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function NoAuthOnlyRoute({ children, ...rest }) {
  
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default MainRouter;