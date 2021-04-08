import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddView from './Components/AddView/addView';
import ListView from './Components/ListView/listView';
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/home.js';
import './index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/add-view" component={AddView} exact />
          <Route path="/list-view" component={ListView} exact />
        </Switch>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
