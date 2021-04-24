import React, { useState } from 'react';
import { db } from '../lib/firebase';

const Home = ({ handleTokenCreation, setToken }) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  const joinList = (e) => {
    e.preventDefault();
    //check if token exists
    const ref = db.collection('lists');
    ref
      .where('token', '==', value.trim())
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          //display error message if it doesn't
          setMessage(
            'Token does not exist. Please try entering another token or creating a new list.',
          );
        } else {
          //setToken as input value if it does
          setToken(value.trim());
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  };

  return (
    <main>
      <button onClick={handleTokenCreation} className="button__home">
        Create a Shopping List
      </button>

      <section className="join-list_container">
        <p>Join an existing shopping list by entering a token.</p>
        <form action="" className="form-container">
          <label htmlFor="existing-token">
            <b>Share Token</b>
          </label>
          <input
            type="text"
            id="existing-token"
            placeholder="Enter three word token"
            value={value}
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={joinList}
            className="button-join"
            disabled={value.length < 1}
          >
            Join an existing list
          </button>
        </form>
        <p>{message}</p>
      </section>
    </main>
  );
};

export default Home;
