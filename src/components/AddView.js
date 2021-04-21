import React, { useState, useContext } from 'react';
import { db } from '../lib/firebase';
import Context from '../Context';
import firebase from 'firebase';
import transformUserInput from '../lib/utils';

const DEFAULT_ITEM = {
  name: '',
  howSoon: '7',
  lastPurchasedDate: null,
};

const AddView = () => {
  const [item, setItem] = useState(DEFAULT_ITEM);
  const [hasError, setHasError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { shoppingList, token, collectionId } = useContext(Context);

  const handleChange = (e) => {
    setHasError(false);
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      item.name = transformUserInput(item.name).toLowerCase();
      const currentItems = shoppingList[0].items.map((item) => {
        return item.name;
      });

      if (currentItems.includes(item.name)) {
        setHasError(true);
        return;
      }

      if (item.name === '') {
        return;
      }
      setSubmitting(true);
      await addListItem(item, collectionId);
      setItem(DEFAULT_ITEM);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const addListItem = async (item, collectionId) => {
    let { name, howSoon, lastPurchasedDate } = item;
    try {
      db.collection('lists')
        .doc(collectionId)
        .update({
          items: firebase.firestore.FieldValue.arrayUnion({
            howSoon,
            name,
            lastPurchasedDate,
          }),
          token,
        });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleAdd}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Purchase Item Name:</label>
            <input
              className="form-field"
              id="name"
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange}
              placeholder={hasError ? 'Add an item' : ''}
            />
          </div>
        </div>
        {hasError ? (
          <div className="field-error">Already on the list</div>
        ) : null}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="howSoon">
              How soon are you likely to buy it again?:
            </label>
            <select
              className="form-field"
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
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className="add-button">
            {submitting ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddView;
