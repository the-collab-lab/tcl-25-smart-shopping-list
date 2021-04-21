import React, { useState, useContext } from 'react';
import { db } from '../lib/firebase';
import Context from '../Context';
import firebase from 'firebase';
import transformUserInput from '../lib/utils';

const DEFAULT_ITEM = {
  name: '',
  howSoon: '',
  lastPurchasedDate: null,
};

const AddView = () => {
  const [item, setItem] = useState(DEFAULT_ITEM);
  const [errors, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { shoppingList, token, collectionId } = useContext(Context);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    let errors = {};
    let formValid = true;
    item.name = transformUserInput(item.name).toLowerCase();
    const currentItems = shoppingList.map((list) => {
      return list.items.map((item) => item.name);
    });

    if (currentItems[0].includes(item.name)) {
      formValid = false;
      errors['sameName'] = 'The name is already there';
    }

    if (item.name === '') {
      formValid = false;
      errors['emptyName'] = 'The name is required';
    }

    if (item.howSoon === '') {
      formValid = false;
      errors['frequency'] = 'Frequency is required';
    }
    setError(errors);
    return formValid;
  };

  const handleAdd = async (e) => {
    try {
      e.preventDefault();

      if (handleValidation()) {
        setSubmitting(true);
        await addListItem(item, collectionId);
        setItem(DEFAULT_ITEM);
      }
      console.log(errors);
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
      throw new error(error);
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
            />
          </div>
        </div>

        {errors['sameName'] || errors['emptyName'] ? (
          <div className="field-error">
            {errors['sameName'] || errors['emptyName']}
          </div>
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
              <option value="">How soon?</option>
              <option value="7">Soon (in the next 7 days)</option>
              <option value="14">Kind of soon (in the next 14 days)</option>
              <option value="30">Not soon (in the next 30 days)</option>
            </select>
          </div>
        </div>

        {errors['frequency'] ? (
          <div className="field-error">{errors['frequency']}</div>
        ) : null}

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
