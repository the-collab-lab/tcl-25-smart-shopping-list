import React, { useState, useEffect } from 'react';

import { db } from '../lib/firebase';

const Checkbox = ({ item, shoppingList }) => {
  const [checked, setChecked] = useState(false);

  const { name, id, lastPurchasedDate } = item;

  const tickCheckBox = async (e) => {};

  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={name}
        className="list__item__input"
        value={name}
        onChange={tickCheckBox}
        checked={checked}
      />

      <label htmlFor={name} className="list__item__label">
        {name}
      </label>
    </>
  );
};

export default Checkbox;
