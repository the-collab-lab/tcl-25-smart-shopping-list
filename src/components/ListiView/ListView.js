import React, { useState, useEffect } from 'react';

import EmptyList from './EmptyList';
import SearchForm from './SearchForm';
import ShoppingList from './ShoppingList';
import Navigation from '../Navigation';
import Spinner from './Spinner';

const ListView = ({ shoppingList, loading, error }) => {
  const [soonCategory, setSoonCategory] = useState([]);
  const [verySoonCategory, setVerySoonCategory] = useState([]);
  const [notSoonCategory, setNotSoonCategory] = useState([]);
  const [inactiveCategory, setInactiveCategory] = useState([]);
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

    setInactiveCategory([]);
    setNotSoonCategory([]);
    setVerySoonCategory([]);
    setSoonCategory([]);
    if (loading === false && shoppingList[0] !== undefined) {
      setLength(shoppingList[0].items.length);
      sortByUrgency();
    }
    if (length >= 1) {
      setShoppingListEmpty(false);
    } else {
      setShoppingListEmpty(true);
    }
  }, [length, loading, shoppingList, value]);

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
                soonCategory={soonCategory}
                verySoonCategory={verySoonCategory}
                notSoonCategory={notSoonCategory}
                inactiveCategory={inactiveCategory}
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
