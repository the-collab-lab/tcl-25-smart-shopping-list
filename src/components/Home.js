import React from 'react';

const Home = (props) => (
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
          onChange="handleChange"
          value=""
        />
        <button type="submit">Join an existing list</button>
      </form>
    </section>
  </main>
);

export default Home;
