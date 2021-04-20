import React, { useState } from 'react';
import { db } from '../lib/firebase';
import firebase from 'firebase';

const Home = (props) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const setToken = props.setToken;

  const handleChange = (e) => setValue(e.target.value);

  const joinList = (e) => {
    e.preventDefault();
    //verify token
    const ref = db.collection('shoppinglist');
    const query = ref
      .where('token', '==', value)
      .get()
      .then(() => {
        if (!query.empty) {
          console.log(query);
          //setToken as input value
          setToken(value);
        } else {
          //display error message
          setMessage(
            'Token does not exist. Please try entering another token or creating a new list.',
          );
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  };

  return (
    <main>
      <button onClick={props.handleTokenCreation} className="button-home">
        Create a Shopping List
      </button>

      <section>
        <form action="">
          <label htmlFor="existingToken">Share Token</label>
          <input
            type="text"
            id="existingToken"
            placeholder="Enter three word token"
            value={value}
            onChange={handleChange}
          />
          <button type="submit" onClick={joinList}>
            Join an existing list
          </button>
        </form>
        <p>{message}</p>
      </section>
    </main>
  );
};

export default Home;
