import React, { useState } from 'react';

const Home = (props) => {
  const [value, setValue] = useState('');
  const setToken = props.setToken;

  const handleChange = (e) => setValue(e.target.value);

  const joinList = (e) => {
    e.preventDefault();
    //verify token

    //setToken as input value
    setToken(value);

    //handle error
  };

  return (
    <main>
      <button onClick={props.handleTokenCreation} className="button-home">
        Create a Shopping List
      </button>

      <section>
        <form action="">
          <label htmlFor="existingToken">Share Token</label>
          <input
            type="text"
            id="existingToken"
            placeholder="Enter three word token"
            value={value}
            onChange={handleChange}
          />
          <button type="submit" onClick={joinList}>
            Join an existing list
          </button>
        </form>
      </section>
    </main>
  );
};

export default Home;
