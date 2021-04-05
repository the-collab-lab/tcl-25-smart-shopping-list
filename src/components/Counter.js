import React, { useState, Fragment } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <Fragment>
      <button>Increment</button>
      <p>0</p>
    </Fragment>
  );
};

export default Counter;
