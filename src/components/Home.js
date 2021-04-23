import React from 'react';

const Home = ({ handleTokenCreation }) => (
  <main>
    <button onClick={handleTokenCreation} className="add-button">
      Create a Shopping List
    </button>
  </main>
);

export default Home;
