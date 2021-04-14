import React, { useState } from 'react';
import { db } from '../lib/firebase';

const AddView = () => {
  const [state, setState] = useState({
    purchaseItem: '',
    howSoon: '7',
    lastPurchaseDate: null,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.purchaseItem.trim()) {
      db.collection('LA')
        .add({
          purchaseItem: state.purchaseItem,
          howSoon: state.howSoon,
          lastPurchaseDate: state.lastPurchaseDate,
        })
        .then(() => {
          alert('Purchase Item has been recorded');
        })
        .catch((error) => {
          alert(error.message);
        });

      setState({
        purchaseItem: '',
        howSoon: '7',
        lastPurchaseDate: null,
      });
    } else {
      alert('Please write an item');
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="purchaseItem">Purchase Item Name:</label>
        <input
          type="text"
          name="purchaseItem"
          value={state.purchaseItem}
          onChange={handleChange}
        />

        <label htmlFor="howSoon">
          How soon are you likely to buy it again?:<br></br>
        </label>
        <select
          name="howSoon"
          value={state.howSoon}
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
