import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import getToken from '../lib/tokens';

const Home = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token' || '')),
  );

  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('/list-view');
    }
    localStorage.setItem('token', JSON.stringify(token));
  }, [token, history]);

  const handleClick = () => {
    if (!token) {
      setToken(getToken());
    }
  };

  return (
    <main>
      <button onClick={handleClick} className="button">
        Create a Shopping List
      </button>
    </main>
  );
};

export default Home;
