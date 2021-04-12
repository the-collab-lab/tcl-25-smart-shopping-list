import React, { useEffect, useState } from 'react';

import getToken from '../lib/tokens';

const Home = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token' || '')),
  );

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <main>
      <button className="button">Create a Shopping List</button>
    </main>
  );
};

export default Home;
