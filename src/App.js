import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import Home from './components/Home';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/add-view" component={AddView} />
        <Route path="/list-view" component={ListView} />
      </Switch>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
