import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddView from './components/AddView';
import ListView from './components/ListView';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/add-view" component={AddView} exact />
          <Route path="/list-view" component={ListView} exact />
        </Switch>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
