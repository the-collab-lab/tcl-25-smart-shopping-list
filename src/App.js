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
import './App.css';

const App = () => {
  const [token, setToken] = useLocalStorageState('token', '');
  const [collectionId, setCollectionId] = useLocalStorageState(
    'collectionId',
    '',
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

  return (
    <BrowserRouter>
      {token ? (
        <>
          <Redirect to="/list-view" />
          <Switch>
            <Route path="/add-view">
              <AddView
                token={token}
                shoppingList={shoppingList}
                collectionId={collectionId}
              />
            </Route>
            <Route path="/list-view">
              <ListView
                shoppingList={shoppingList}
                loading={loading}
                error={error}
              />
            </Route>
          </Switch>

          <Navigation />
        </>
      ) : (
        <Home
          handleTokenCreation={handleTokenCreation}
          token={token}
          collectionId={collectionId}
        />
      )}
    </BrowserRouter>
  );
};

export default App;
