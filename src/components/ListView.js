import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  if (shoppingList[0].items.length >= 1) {
    setShoppingListEmpty(false);
  }

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
