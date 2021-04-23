import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  return (
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
            list.items
              .map((item) => item)
              .map((val) => <ListItem key={uuidv4()} item={val} />),
          )}
      </ul>
    </>
  );
};

export default ListView;
