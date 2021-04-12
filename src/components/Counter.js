import React, { useState, Fragment } from 'react';

import { db } from '../lib/firebase';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const Counter = () => {
  const [counter, setCounter] = useState(1);

  const [countersCollection] = useCollectionData(db.collection('counters'), {
    idField: 'id',
  });

  const sortedCollection =
    countersCollection &&
    [...countersCollection].sort((a, b) => a.value - b.value);

  const handleAdd = () => {
    setCounter((c) => c + 1);
    db.collection('counters').add({
      value: counter,
    });
  };

  return (
    <Fragment>
      <div className="wrapper">
        <div className="wrapper__button">
          <button onClick={handleAdd} className="button">
            Add
          </button>
        </div>
        <ul className="wrapper__collection">
          {sortedCollection &&
            sortedCollection.map((item) => <li key={item.id}>{item.value}</li>)}
        </ul>
      </div>
    </Fragment>
  );
};

export default Counter;
