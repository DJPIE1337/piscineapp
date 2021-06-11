import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './login';
import Dashboard from './dashboard';
import Admin from './admin';
import PiscineSessions from './piscinesessions';
import {apiPost} from './api';
import PrivateRoute from './utils/privateroute';
import PublicRoute from './utils/publicroute';
import { getToken, getUser, removeUserSession, setUserSession } from './utils/common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const token = getToken(); 
    const user = getUser(); 
    if (!token) {
      return;
    }
    apiPost(`users/verifytoken`, {token: token, user: user}).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/piscinesessions" component={PiscineSessions} />
              <PrivateRoute path="/admin" component={Admin} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
