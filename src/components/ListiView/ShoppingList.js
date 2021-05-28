import React from 'react';

import ListItem from './ListItem';
import capitalizeFirstLetter from '../../lib/capitalize';

const ShoppingList = ({
  sortedList,
  value,
  shoppingList,
  soonCategory,
  verySoonCategory,
  notSoonCategory,
  inactiveCategory,
}) => {
  let purchaseIndex;

  const checkIndex = (lastPurchase, nextPurchase, timesPurchased) => {
    const interval = new Date().getTime() - lastPurchase;
    const dayToMilliseconds = 86400000;

    if (
      timesPurchased <= 1 &&
      interval >= 2 * nextPurchase * dayToMilliseconds
    ) {
      purchaseIndex = 'inactive';
    } else if (nextPurchase <= 7) {
      purchaseIndex = 'soon';
    } else if (nextPurchase < 30) {
      purchaseIndex = 'kind-of-soon';
    } else {
      purchaseIndex = 'not-soon';
    }
  };

  return (
    <ul className="list">
      {sortedList.forEach((item) => {
        const searchResult = item.name.includes(value.toLowerCase().trim());

        checkIndex(
          item.lastPurchasedDate,
          item.daysLeftForNextPurchase,
          item.numberOfPurchases,
        );

        if (searchResult && purchaseIndex === 'soon') {
          if (!soonCategory.includes(item)) {
            soonCategory.push(item);
          }
        } else if (searchResult && purchaseIndex === 'kind-of-soon') {
          if (!verySoonCategory.includes(item)) {
            verySoonCategory.push(item);
          }
        } else if (searchResult && purchaseIndex === 'not-soon') {
          if (!notSoonCategory.includes(item)) {
            notSoonCategory.push(item);
          }
        } else if (searchResult && purchaseIndex === 'inactive') {
          if (!inactiveCategory.includes(item)) {
            inactiveCategory.push(item);
          }
        }
      })}

      <li className="soonCategory">
        {soonCategory.length > 0 ? (
          <h4>
            <span>{capitalizeFirstLetter('soon')}</span>
          </h4>
        ) : null}
        {soonCategory.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              shoppingList={shoppingList}
              index="soon"
              ariaLabel="next purchase: soon"
            />
          );
        })}
      </li>

      <li className="kindOfSoonCategory">
        {verySoonCategory.length > 0 ? (
          <h4>
            <span>{capitalizeFirstLetter('kind of soon')}</span>
          </h4>
        ) : null}
        {verySoonCategory.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              shoppingList={shoppingList}
              index="kind-of-soon"
              ariaLabel="next purchase: kind of soon"
            />
          );
        })}
      </li>
      <li className="notSoonCategory">
        {notSoonCategory.length > 0 ? (
          <h4>
            <span>{capitalizeFirstLetter('not soon')}</span>
          </h4>
        ) : null}
        {notSoonCategory.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              shoppingList={shoppingList}
              index="not-soon"
              ariaLabel="next purchase: not soon"
            />
          );
        })}
      </li>

      <li className="inactiveCategory">
        {inactiveCategory.length > 0 ? (
          <h4>
            <span>{capitalizeFirstLetter('inactive')}</span>
          </h4>
        ) : null}
        {inactiveCategory.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              shoppingList={shoppingList}
              index="inactive"
              ariaLabel="next purchase: inactive"
            />
          );
        })}
      </li>
    </ul>
  );
};

export default ShoppingList;
