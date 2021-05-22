import React, { useState } from 'react';

import { db } from '../lib/firebase';

import Header from './Header';
import SubmitIcon from './SubmitIcon';
import ArrowIcon from './ArrowIcon';

const Home = ({ handleTokenCreation, setToken, setCollectionId }) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  const joinList = (e) => {
    e.preventDefault();
    const ref = db.collection('lists');
    ref
      .where('token', '==', value.trim())
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          setMessage(
            'Token does not exist. Please try entering another token or creating a new list.',
          );
        } else {
          setCollectionId(querySnapshot.docs[0].id);
          setToken(value.trim());
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  };

  return (
    <main>
      <button onClick={handleTokenCreation} className="add-button">
        Create a Shopping List
      </button>

      <div>
        <h1>Join an existing shopping list by entering a token</h1>
      </div>

      <form className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="existing-token">Share Token</label>
            <input
              type="text"
              id="existing-token"
              className="form-field"
              placeholder="Enter three word token"
              value={value}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <button
            type="submit"
            onClick={joinList}
            className="join-button"
            disabled={value.length < 1}
          >
            Join an existing list
          </button>
        </div>
      </form>

      <p>{message}</p>
    </main>
  );
};

export default Home;
