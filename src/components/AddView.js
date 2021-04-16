import React, { useState } from 'react';
import { db } from '../lib/firebase';

const AddView = () => {
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
    if (item.name.trim()) {
      let token =
        localStorage.length !== 0 ? localStorage.getItem('token') : 'LA';
      db.collection(token)
        .add({
          purchaseItem: item.name,
          howSoon: item.howSoon,
          lastPurchaseDate: item.lastPurchasedDate,
        })
        .then(() => {
          alert('Purchase Item has been recorded');
        })
        .catch((error) => {
          alert(error.message);
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
