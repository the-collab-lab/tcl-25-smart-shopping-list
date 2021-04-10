import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import Counter from './components/Counter';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/add-view" component={AddView} exact />
        <Route path="/list-view" component={ListView} exact />
        <Counter />
      </Switch>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
