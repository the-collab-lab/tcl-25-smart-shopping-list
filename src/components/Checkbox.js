import React, { useState, useEffect, useCallback } from 'react';
import calculateEstimate from '../lib/estimates';

import { db } from '../lib/firebase';

const Checkbox = ({ item, index, shoppingList }) => {
  const [checked, setChecked] = useState(false);
  const { name, id, daysLeftForNextPurchase, lastPurchasedDate } = item;
  const isExpired = useCallback((lastPurchasedDate) => {
    const expiryDate = lastPurchasedDate + 60 * 60 * 24 * 1000;
    const now = new Date().getTime();
    return expiryDate < now;
  }, []);
  useEffect(() => {
    if (lastPurchasedDate === null || isExpired(lastPurchasedDate)) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [lastPurchasedDate, isExpired]);

  const tickCheckBox = async (e) => {
    if (e.target.checked) {
      setChecked(true);
      let item = shoppingList[0].items.find((entry) => entry.id === id);
      item.lastPurchasedDate = new Date().getTime();
      item.numberOfPurchases++;
      item.daysLeftForNextPurchase = estimateDaysLeft();
      await db
        .collection('lists')
        .doc(shoppingList[0].id)
        .set({ items: shoppingList[0].items }, { merge: true });
    }
  };

  const estimateDaysLeft = () => {
    let lastEstimate = daysLeftForNextPurchase;
    let lastestInterval =
      lastPurchasedDate != null
        ? Math.floor(
            (new Date().getTime() - lastPurchasedDate) / (60 * 60 * 24 * 1000),
          )
        : lastEstimate;
    let purchaseNumber = item.numberOfPurchases;
    let estimatedInterval = calculateEstimate(
      lastEstimate,
      lastestInterval,
      purchaseNumber,
    );
    return estimatedInterval;
  };
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

      <label htmlFor={name} className={`list__item__label ${index}`}>
        {name}
      </label>
    </>
  );
};

export default Checkbox;
