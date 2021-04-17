import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import getToken from './lib/tokens';
import './App.css';

const App = () => {
  const token = getToken();
  return (
    <BrowserRouter>
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
  );
};

export default App;
