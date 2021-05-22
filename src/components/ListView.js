import React, { useState, useEffect } from 'react';

import Spinner from '../components/Spinner';
import EmptyList from './EmptyList';
import SearchForm from '../components/SearchForm';
import ShoppingList from '../components/ShoppingList';
import Navigation from '../components/Navigation';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const sortByUrgency = () => {
      setSortedList(
        shoppingList[0].items.sort(
          (a, b) =>
            a.daysLeftForNextPurchase - b.daysLeftForNextPurchase ||
            a.name.localeCompare(b.name),
        ),
      );
    };

    if (loading === false && shoppingList[0] !== undefined) {
      setLength(shoppingList[0].items.length);
      sortByUrgency();
    }

    if (length >= 1) {
      setShoppingListEmpty(false);
    } else {
      setShoppingListEmpty(true);
    }
  }, [length, loading, shoppingList]);

  const handleChange = (e) => setValue(e.target.value);

  return loading === false && shoppingListEmpty ? (
    <EmptyList />
  ) : (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Spinner />}
      {shoppingList && shoppingList[0] && (
        <div className="wrapper">
          <div className="dot-shadow panel">
            <main className="list-view flow">
              <SearchForm value={value} handleChange={handleChange} />
              <ShoppingList
                sortedList={sortedList}
                shoppingList={shoppingList}
                value={value}
              />

              <Navigation />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default ListView;
