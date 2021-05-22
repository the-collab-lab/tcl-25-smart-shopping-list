import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');
  const [sortedList, setSortedList] = useState([]);

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

  useEffect(() => {
    const sortByUrgency = () => {
      setSortedList(
        shoppingList[0].items.sort(
          (a, b) =>
            a.daysLeftForNextPurchase - b.daysLeftForNextPurchase ||
            a.name.localeCompare(b.name),
        ),
      );
    };

    if (loading === false && shoppingList[0] !== undefined) {
      setLength(shoppingList[0].items.length);
      sortByUrgency();
    }

    if (length >= 1) {
      setShoppingListEmpty(false);
    } else {
      setShoppingListEmpty(true);
    }
  }, [length, loading, shoppingList]);

  const handleChange = (e) => setValue(e.target.value);

  return loading === false && shoppingListEmpty ? (
    <div className="prompt">
      <h1>No Item Added</h1>
      <Link to="/add-view" className="add-button">
        Add Item
      </Link>
    </div>
  ) : (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {shoppingList && shoppingList[0] && (
        <main>
          <form className="search-box">
            <input
              type="search"
              placeholder="Search list for item"
              aria-label="search-box"
              className="form-field search-box"
              value={value}
              onChange={handleChange}
            />
          </form>

          <ul className="list">
            {sortedList.map((item) => {
              const searchResult = item.name.includes(
                value.toLowerCase().trim(),
              );
              //check urgency index of item
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
                    //pass props for className and aria-label to item
                    index={purchaseIndex}
                    ariaLabel={ariaLabel}
                  />
                )
              );
            })}
          </ul>

          <div className="legend">
            <h2>Legend</h2>
            <div className="flex-row">
              <div className="color-box soon" aria-label="soon"></div>
              <p>Less than 7 days till next purchase</p>
            </div>
            <div className="flex-row">
              <div
                className="color-box kind-of-soon"
                aria-label="kind of soon"
              ></div>
              <p>7-30 days till next purchase</p>
            </div>
            <div className="flex-row">
              <div className="color-box not-soon" aria-label="not soon"></div>
              <p>More than 30 days till next purchase</p>
            </div>
            <div className="flex-row">
              <div className="color-box inactive" aria-label="inactive"></div>
              <p>
                Item has been purchased less than twice, or estimated purchase
                time has elapsed significantly.
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ListView;
