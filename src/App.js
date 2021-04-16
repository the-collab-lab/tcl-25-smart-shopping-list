import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import Home from './components/Home';

import getToken from './lib/tokens';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token' || ''));

  const handleTokenCreation = () => {
    setToken(getToken());
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home token={token} handleTokenCreation={handleTokenCreation} />
        </Route>
        <Route path="/add-view" component={AddView} />
        <Route path="/list-view">
          <ListView token={token} />
        </Route>
      </Switch>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
