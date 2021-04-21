import React, { useState, useContext } from 'react';
import { db } from '../lib/firebase';
import Context from '../Context';
import firebase from 'firebase';
import transformUserInput from '../lib/utils';

const AddView = ({ token }) => {
  const [item, setItem] = useState({
    name: '',
    howSoon: '7',
    lastPurchasedDate: null,
  });

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let docAvailable = false;
    if (item.name.trim()) {
      const newItem = {
        name: item.name,
        lastPurchasedDate: item.lastPurchasedDate,
        howSoon: item.howSoon,
      };
      db.collection('shoppinglist')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().token === token) {
              docAvailable = true;
              doc.ref.update({
                items: firebase.firestore.FieldValue.arrayUnion(newItem),
              });
            }
          });
          if (docAvailable === false) {
            db.collection('shoppinglist').add({
              items: [newItem],
              token: token,
            });
          }
        });

      setItem({
        name: '',
        howSoon: '7',
        lastPurchasedDate: null,
      });
    } else {
      alert('Please write an item');
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="name">Purchase Item Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
        />

        <label htmlFor="howSoon">
          How soon are you likely to buy it again?:
        </label>
        <select
          id="howSoon"
          name="howSoon"
          value={item.howSoon}
          onBlur={handleChange}
          onChange={handleChange}
        >
          <option value="7">Soon (in the next 7 days)</option>
          <option value="14">Kind of soon (in the next 14 days)</option>
          <option value="30">Not soon (in the next 30 days)</option>
        </select>

        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </>
  );
};

export default AddView;
