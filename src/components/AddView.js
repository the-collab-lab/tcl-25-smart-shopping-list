import React, { useState } from 'react';

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

  return (
    <>
      <form className="form-container">
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
