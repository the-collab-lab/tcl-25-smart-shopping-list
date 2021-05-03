import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);

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

      <main>
        <input
          type="text"
          placeholder="Search list for item"
          value={value}
          onChange={handleChange}
        />

        <ul className="list">
          {shoppingList &&
            shoppingList[0] &&
            shoppingList[0].items.map((item) => (
              <ListItem key={item.id} item={item} shoppingList={shoppingList} />
            ))}
        </ul>
      </main>
    </>
  );
};

export default ListView;
