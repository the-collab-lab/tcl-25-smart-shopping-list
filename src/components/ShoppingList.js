import React from 'react';

import ListItem from '../components/ListItem';

const ShoppingList = ({ sortedList, value, shoppingList }) => {
  let purchaseIndex, ariaLabel;

  const checkIndex = (lastPurchase, nextPurchase, timesPurchased) => {
    const interval = new Date().getTime() - lastPurchase;
    const dayToMilliseconds = 86400000;

    if (
      timesPurchased <= 1 ||
      interval >= 2 * nextPurchase * dayToMilliseconds
    ) {
      purchaseIndex = 'inactive';
      ariaLabel = 'inactive';
    } else if (nextPurchase < 7) {
      purchaseIndex = 'soon';
      ariaLabel = 'next purchase: soon';
    } else if (nextPurchase < 30) {
      purchaseIndex = 'kind-of-soon';
      ariaLabel = 'next purchase: kind of soon';
    } else {
      purchaseIndex = 'not-soon';
      ariaLabel = 'next purchase: not soon';
    }
  };

  return (
    <ul className="list">
      {sortedList.map((item) => {
        const searchResult = item.name.includes(value.toLowerCase().trim());
        checkIndex(
          item.lastPurchasedDate,
          item.daysLeftForNextPurchase,
          item.numberOfPurchases,
        );

        return (
          searchResult && (
            <ListItem
              key={item.id}
              item={item}
              shoppingList={shoppingList}
              index={purchaseIndex}
              ariaLabel={ariaLabel}
            />
          )
        );
      })}
    </ul>
  );
};

export default ShoppingList;
