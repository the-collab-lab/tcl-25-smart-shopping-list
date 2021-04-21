import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import getToken from './lib/tokens';
import { db } from './lib/firebase';
import useLocalStorageState from './hooks/useLocalStorageState';

import Home from './components/Home';
import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import Context from './Context';
import './App.css';

const App = () => {
  const [token, setToken] = useLocalStorageState('token', '');

  const handleTokenCreation = () => {
    setToken(getToken());
  };
  return token ? (
    <BrowserRouter>
      <Redirect to="/list-view" />
      <Switch>
        <Route path="/add-view" exact>
          <AddView token={token} />
        </Route>
        <Route path="/list-view" exact>
          <ListView token={token} />
        </Route>
      </Switch>
      <Navigation />
    </BrowserRouter>
  ) : (
    <Home handleTokenCreation={handleTokenCreation} />
  );
};

export default App;
