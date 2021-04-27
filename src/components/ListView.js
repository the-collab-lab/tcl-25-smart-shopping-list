import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);

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

  return shoppingListEmpty ? (
    <div>
      <h1>No Item Added</h1>
      <Link to="/add-view" />
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
      <ul className="list">
        {shoppingList &&
          shoppingList.map((list) =>
            list.items.map((item) => <ListItem key={uuidv4()} item={item} />),
          )}
      </ul>
    </>
  );
};

export default ListView;
