import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');
  let purchaseIndex;

  const handleChange = (e) => setValue(e.target.value);

  const checkIndex = (nextPurchase) => {
    if (nextPurchase < 7) {
      purchaseIndex = 'soon';
    } else if (nextPurchase < 30) {
      purchaseIndex = 'kind-of-soon';
    } else if (nextPurchase > 30) {
      purchaseIndex = 'not-soon';
    } else {
      purchaseIndex = 'inactive';
    }
  };

  useEffect(() => {
    if (loading === false && shoppingList[0] !== undefined) {
      setLength(shoppingList[0].items.length);
    }

    if (length >= 1) {
      setShoppingListEmpty(false);
    } else {
      setShoppingListEmpty(true);
    }
  }, [length, loading, shoppingList]);

  return loading === false && shoppingListEmpty ? (
    <div className="prompt">
      <h1>No Item Added</h1>
      <Link to="/add-view" className="add-button">
        Add Item
      </Link>
    </div>
  ) : (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {!loading && (
        <main>
          <form className="search-box">
            <input
              type="search"
              placeholder="Search list for item"
              aria-label="search-box"
              className="form-field search-box"
              value={value}
              onChange={handleChange}
            />
          </form>

          <ul className="list">
            {shoppingList &&
              shoppingList[0] &&
              shoppingList[0].items.map((item) => {
                const searchResult = item.name.includes(
                  value.toLowerCase().trim(),
                );
                const nextPurchase = item.daysLeftForNextPurchase;
                checkIndex(nextPurchase);

                return (
                  searchResult && (
                    <ListItem
                      key={item.id}
                      item={item}
                      index={purchaseIndex}
                      shoppingList={shoppingList}
                    />
                  )
                );
              })}
          </ul>
        </main>
      )}
    </>
  );
};

export default ListView;
