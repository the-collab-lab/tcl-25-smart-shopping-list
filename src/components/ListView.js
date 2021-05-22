import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '../components/ListItem';
import capitalizeFirstLetter from '../lib/capitalize';

const ListView = ({ shoppingList, loading, error }) => {
  const [soonCategory, setSoonCategory] = useState([]);
  const [verySoonCategory, setVerySoonCategory] = useState([]);
  const [notSoonCategory, setNotSoonCategory] = useState([]);
  const [inactiveCategory, setInactiveCategory] = useState([]);
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
    const interval = new Date().getTime() - lastPurchase;
    //one day converted to milliseconds
    const dayToMilliseconds = 86400000;
    //set index as inactive if item has been purchased only once or less
    //or if interval is >= 2 times the projected estimate
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

  useEffect(() => {
    //sort items according to days left till next purchase
    //if items have same number of days left, filter alphabetically
    //used localeCompare to sort without consideration for case
    const sortByUrgency = () => {
      setSortedList(
        shoppingList[0].items.sort(
          (a, b) =>
            a.daysLeftForNextPurchase - b.daysLeftForNextPurchase ||
            a.name.localeCompare(b.name),
        ),
      );
    };

    setInactiveCategory([]);
    setNotSoonCategory([]);
    setVerySoonCategory([]);
    setSoonCategory([]);
    if (loading === false && shoppingList[0] !== undefined) {
      setLength(shoppingList[0].items.length);
      sortByUrgency();
    }
    if (length >= 1) {
      setShoppingListEmpty(false);
    } else {
      setShoppingListEmpty(true);
    }
  }, [length, loading, shoppingList, value]);

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
            <>
              {sortedList.forEach((item) => {
                const searchResult = item.name.includes(
                  value.toLowerCase().trim(),
                );
                //check urgency index of item
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

              <div className="soonCategory">
                {soonCategory.length > 0 ? (
                  <h4>{capitalizeFirstLetter('soon')}</h4>
                ) : null}
                {soonCategory.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      shoppingList={shoppingList}
                      //pass props for className and aria-label to item
                      index="soon"
                      ariaLabel="next purchase: soon"
                    />
                  );
                })}
              </div>

              <div className="kindOfSoonCategory">
                {verySoonCategory.length > 0 ? (
                  <h4>{capitalizeFirstLetter('kind of soon')}</h4>
                ) : null}
                {verySoonCategory.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      shoppingList={shoppingList}
                      //pass props for className and aria-label to item
                      index="kind-of-soon"
                      ariaLabel="next purchase: kind of soon"
                    />
                  );
                })}
              </div>
              <div className="notSoonCategory">
                {notSoonCategory.length > 0 ? (
                  <h4>{capitalizeFirstLetter('not soon')}</h4>
                ) : null}
                {notSoonCategory.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      shoppingList={shoppingList}
                      //pass props for className and aria-label to item
                      index="not-soon"
                      ariaLabel="next purchase: not soon"
                    />
                  );
                })}
              </div>

              <div className="inactiveCategory">
                {inactiveCategory.length > 0 ? (
                  <h4>{capitalizeFirstLetter('inactive')}</h4>
                ) : null}
                {inactiveCategory.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      shoppingList={shoppingList}
                      //pass props for className and aria-label to item
                      index="inactive"
                      ariaLabel="next purchase: inactive"
                    />
                  );
                })}
              </div>
            </>
          </ul>
        </main>
      )}
    </>
  );
};

export default ListView;
