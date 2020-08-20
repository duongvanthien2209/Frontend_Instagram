import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Component
import Login from './components/pages/login/components/Login';
import Register from './components/pages/register/components/Register';
import Main from './components/pages/main/components/Main';

const checkAuth = () => {
  let token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <AuthRoute path="/" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
