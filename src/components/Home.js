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
          setMessage('Token does not exist');
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
    <div className="wrapper">
      <div className="app">
        <div className="app__dots-shadow panel">
          <main className="align-center">
            <Header />
            <div>
              <button
                onClick={handleTokenCreation}
                className="app__create-button"
              >
                Create a New List
                <span className="create-button__icon">
                  <ArrowIcon />
                </span>
              </button>

              <form className="app__token-form flow">
                <label htmlFor="token" className="visually-hidden">
                  Join existing list with a token
                </label>
                <div className="token-form__field">
                  <input
                    type="text"
                    id="token"
                    className="token-form__input"
                    placeholder="Join with a token"
                    value={value}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    onClick={joinList}
                    className="token-form__button"
                    disabled={value.length < 1}
                  >
                    <span className="icon">
                      <SubmitIcon />
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <p>{message}</p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
