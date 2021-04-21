import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
  const [collectionId, setCollectionId] = useLocalStorageState(
    'collectionId',
    [],
  );

  const addListItem = async (token) => {
    return await db.collection('lists').add({
      items: [],
      token,
    });
  };

  const handleTokenCreation = async () => {
    const token = getToken();
    setToken(token);
    const { id } = await addListItem(token);
    setCollectionId(id);
  };

  const [shoppingList, loading, error] = useCollectionData(
    db.collection('lists').where('token', '==', token),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
      idField: 'id',
    },
  );

  return token ? (
    <Context.Provider
      value={{ token, shoppingList, loading, error, collectionId }}
    >
      <BrowserRouter>
        <Redirect to="/list-view" />
        <Switch>
          <Route path="/add-view" component={AddView} />
          <Route path="/list-view" component={ListView} />
        </Switch>
        <Navigation />
      </BrowserRouter>
    </Context.Provider>
  ) : (
    <Home handleTokenCreation={handleTokenCreation} />
  );
};

export default App;
