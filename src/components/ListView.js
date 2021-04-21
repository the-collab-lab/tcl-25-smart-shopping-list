import React, { useContext } from 'react';

import { v4 as uuidv4 } from 'uuid';
import ListItem from '../components/ListItem';
import Context from '../Context';

const ListView = () => {
  const { shoppingList, loading, error } = useContext(Context);
  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
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
