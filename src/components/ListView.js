import React from 'react';

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
          shoppingList[0].items.map((item) => (
            <ListItem key={item.id} item={item} shoppingList={shoppingList} />
          ))}
      </ul>
    </>
  );
};

export default ListView;
