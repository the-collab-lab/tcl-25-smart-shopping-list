import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = ({ token }) => {
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('/list-view');
    }
    localStorage.setItem('token', JSON.stringify(token));
  }, [token, history]);

  return (
    <main>
      <button className="button__home">Create a Shopping List</button>
    </main>
  );
};

export default Home;
