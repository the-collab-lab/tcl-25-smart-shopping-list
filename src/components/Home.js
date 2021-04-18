import React from 'react';

const Home = ({ handleTokenCreation }) => (
  <main>
    <button onClick={handleTokenCreation} className="button-home">
      Create a Shopping List
    </button>
  </main>
);

export default Home;
