import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');
  const [sortedList, setSortedList] = useState([]);
  //indicator for urgency status of item
  let purchaseIndex;

  const handleChange = (e) => setValue(e.target.value);

  //assign value to purchaseIndex based on these parameters
  const checkIndex = (lastPurchase, nextPurchase, timesPurchased) => {
    //check interval between current date and date of last purchase
    //set index as inactive if item has been purchased only once or less
    //or if interval is >= 2 times the projected estimate
    const interval = new Date().getTime() - lastPurchase;
    if (timesPurchased <= 1 || interval >= 2 * nextPurchase * 86400000) {
      purchaseIndex = 'inactive';
    } else if (nextPurchase < 7) {
      purchaseIndex = 'soon';
    } else if (nextPurchase >= 7 && nextPurchase < 30) {
      purchaseIndex = 'kind-of-soon';
    } else if (nextPurchase > 30) {
      purchaseIndex = 'not-soon';
    }
  };

  //todays date - lastpurchase >= 2*nextpurchase

  useEffect(() => {
    //sort items according to days left till next purchase
    //if items have same number of days left, filter alphabetically
    //used localeCompare to sort without consideration for case
    const filterUrgency = () => {
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
      filterUrgency();
    }

    if (length >= 1) {
      setShoppingListEmpty(false);
    } else {
      setShoppingListEmpty(true);
    }
  }, [length, loading, shoppingList]);

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
              //pass parameters to checkIndex function
              const lastPurchase = item.LastPurchasedDate;
              const nextPurchase = item.daysLeftForNextPurchase;
              const timesPurchased = item.numberOfPurchases;
              //check urgency index of item
              checkIndex(lastPurchase, nextPurchase, timesPurchased);

              return (
                searchResult && (
                  <ListItem
                    key={item.id}
                    item={item}
                    //index prop assigns className and aria-label to item
                    index={purchaseIndex}
                    shoppingList={shoppingList}
                  />
                )
              );
            })}
          </ul>
        </main>
      )}
    </>
  );
};

export default ListView;
