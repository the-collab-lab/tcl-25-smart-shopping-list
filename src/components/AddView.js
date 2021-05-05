import React, { useState } from 'react';

import { db } from '../lib/firebase';
import firebase from 'firebase';
import transformUserInput from '../lib/utils';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_ITEM = {
  name: '',
  daysLeftForNextPurchase: null,
  lastPurchasedDate: null,
};

const AddView = ({ shoppingList, token, collectionId }) => {
  const [item, setItem] = useState(DEFAULT_ITEM);
  const [hasDuplicates, setHasDuplicates] = useState(false);
  const [isNameFieldEmpty, setIsNameFieldEmpty] = useState(false);
  const [isFrequencyFieldEmpty, setIsFrequencyFieldEmpty] = useState(false);
  const handleChange = (e) => {
    setHasDuplicates(false);
    setIsNameFieldEmpty(false);
    setIsFrequencyFieldEmpty(false);
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      item.name = transformUserInput(item.name);

      const currentItems = shoppingList.map((list) => {
        return list.items.map((item) => item.name);
      });

      if (currentItems[0].includes(item.name)) {
        setHasDuplicates(true);
        return;
      }

      if (item.name === '' && item.daysLeftForNextPurchase === '') {
        setIsNameFieldEmpty(true);
        setIsFrequencyFieldEmpty(true);
        return;
      }

      if (item.name === '') {
        setIsNameFieldEmpty(true);
        return;
      }

      if (item.daysLeftForNextPurchase === '') {
        setIsFrequencyFieldEmpty(true);
        return;
      }

      await addListItem(item, collectionId);
      setItem(DEFAULT_ITEM);
    } catch (error) {
      console.error(error);
    }
  };

  const addListItem = async (item, collectionId) => {
    let { name, daysLeftForNextPurchase, lastPurchasedDate } = item;
    try {
      db.collection('lists')
        .doc(collectionId)
        .update({
          items: firebase.firestore.FieldValue.arrayUnion({
            daysLeftForNextPurchase: parseInt(daysLeftForNextPurchase),
            name,
            lastPurchasedDate,
            id: uuidv4(),
            numberOfPurchases: 0,
          }),
          token,
        });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <form className="form" onSubmit={handleAdd}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Purchase Item Name</label>
          <input
            className="form-field"
            id="name"
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder={!isNameFieldEmpty ? 'Add an item' : ''}
          />
        </div>
      </div>
      {hasDuplicates ? (
        <div className="field-error">Item is already on the list</div>
      ) : null}
      {isNameFieldEmpty ? (
        <div className="field-error">This field is required</div>
      ) : null}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="howSoon">
            How soon are you likely to buy it again?
          </label>
          <select
            className="form-field"
            id="howSoon"
            name="daysLeftForNextPurchase"
            value={item.daysLeftForNextPurchase}
            onBlur={handleChange}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="7">Soon (in the next 7 days)</option>
            <option value="14">Kind of soon (in the next 14 days)</option>
            <option value="30">Not soon (in the next 30 days)</option>
          </select>
        </div>
      </div>
      {isFrequencyFieldEmpty ? (
        <div className="field-error">This field is required</div>
      ) : null}
      <div className="form-row">
        <button type="submit" className="add-button">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddView;
