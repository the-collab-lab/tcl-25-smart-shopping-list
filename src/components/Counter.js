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
      {loading && <span className="align-center">Loading...</span>}
      <div className="button-container align-center">
        <div className="button-container__inner">
          <button onClick={handleClick} className="btn">
            Increment
          </button>
          {countersCollection && (
            <p className="button-container__content">{counter}</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Counter;
