import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import Home from './components/Home';

import getToken from './lib/tokens';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add-view" component={AddView} />
        <Route path="/list-view" component={ListView} />
      </Switch>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
