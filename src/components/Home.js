import React, { useState } from 'react';
import { db } from '../lib/firebase';

const Home = (props) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const setToken = props.setToken;

  const handleChange = (e) => setValue(e.target.value);

  const joinList = (e) => {
    e.preventDefault();
    //stringify input value
    const userToken = JSON.stringify(value);
    //check if token exists
    const ref = db.collection('shoppinglist');
    ref
      .where('token', '==', userToken)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          //display error message if it doesn't
          setMessage(
            'Token does not exist. Please try entering another token or creating a new list.',
          );
        } else {
          //setToken as input value if it does
          setToken(userToken);
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
