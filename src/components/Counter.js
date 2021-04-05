import React, { useState, Fragment } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((c) => c + 1);
  };

  return (
    <Fragment>
      <button onClick={handleClick}>Increment</button>
      <p>0</p>
    </Fragment>
  );
};

export default Counter;
