import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = ({ token, handleTokenCreation }) => {
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('/list-view');
    }
    localStorage.setItem('token', token);
  }, [token, history]);

  return (
    <main>
      <button onClick={handleTokenCreation} className="button__home">
        Create a Shopping List
      </button>
    </main>
  );
};

export default Home;
