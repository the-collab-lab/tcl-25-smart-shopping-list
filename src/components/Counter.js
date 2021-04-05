import React, { useState, Fragment } from 'react';

import { db } from '../lib/firebase';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const [countersCollection, loading, error] = useCollectionData(
    db.collection('counters'),
    {
      idField: 'id',
    },
  );

  const handleClick = () => {
    setCounter((c) => c + 1);
    db.collection('counters').add({
      value: counter,
    });
  };

  return (
    <Fragment>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <button onClick={handleClick}>Increment</button>
      <p>{counter}</p>
      {countersCollection &&
        countersCollection.map((counter) => (
          <li key={counter.id}>{counter.value}</li>
        ))}
    </Fragment>
  );
};

export default Counter;
