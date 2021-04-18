import React from 'react';

const Home = ({ handleTokenCreation }) => (
  <main>
    <button onClick={handleTokenCreation} className="button__home">
      Create a Shopping List
    </button>
  </main>
);

export default Home;
