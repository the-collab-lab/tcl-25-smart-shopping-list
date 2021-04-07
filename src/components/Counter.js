import React, { useState, Fragment, useEffect } from 'react';

import { db } from '../lib/firebase';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const Counter = () => {
  const [counter, setCounter] = useState(
    JSON.parse(localStorage.getItem('counter')) || 1,
  );

  const [countersCollection] = useCollectionData(db.collection('counters'), {
    idField: 'id',
  });

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
  }, [counter]);

  const sortedCollection =
    countersCollection &&
    [...countersCollection].sort((a, b) => a.value - b.value);

  const handleClick = () => {
    setCounter((c) => c + 1);
    db.collection('counters').add({
      value: counter,
    });
  };

  return (
    <Fragment>
      <div className="button-container">
        <button onClick={handleClick} className="button">
          Add
        </button>
        <ul className="button-container__list">
          {sortedCollection &&
            sortedCollection.map((item) => <li key={item.id}>{item.value}</li>)}
        </ul>
      </div>
    </Fragment>
  );
};

export default Counter;
