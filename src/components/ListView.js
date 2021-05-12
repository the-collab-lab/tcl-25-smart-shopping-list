import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');

  //arrays for items filtered according to urgency
  const [soonArr, setSoonArr] = useState([]);
  const [kindOfSoonArr, setKindOfSoonArr] = useState([]);
  const [notSoonArr, setNotSoonArr] = useState([]);
  const [inactiveArr, setInactiveArr] = useState([]);

  const handleChange = (e) => setValue(e.target.value);

  useEffect(() => {
    const filterUrgency = () => {
      //filters items according to days left till next purchase
      //still need to add number of purchases to criteria (for inactive items)
      //Haven't filtered and sorted inactive items.
      const soonItems = shoppingList[0].items.filter(
        (item) => item.daysLeftForNextPurchase < 7,
      );
      const kindOfSoonItems = shoppingList[0].items.filter(
        (item) =>
          item.daysLeftForNextPurchase >= 7 &&
          item.daysLeftForNextPurchase < 30,
      );
      const notSoonItems = shoppingList[0].items.filter(
        (item) => item.daysLeftForNextPurchase > 30,
      );

      //sorted items alphabetically
      //used localeCompare to sort without consideration for case
      //The ACs say to sort according to date for next purchase though, and then
      //items with same date should be sorted alphabetically. Need to fix.
      setSoonArr(soonItems.sort((a, b) => a.name.localeCompare(b.name)));
      setKindOfSoonArr(
        kindOfSoonItems.sort((a, b) => a.name.localeCompare(b.name)),
      );
      setNotSoonArr(notSoonItems.sort((a, b) => a.name.localeCompare(b.name)));
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
            {soonArr.length && (
              //maps items in each array into separate divs so they are displayed together
              <div className="container__soon">
                {soonArr.map((item) => {
                  const searchResult = item.name.includes(
                    value.toLowerCase().trim(),
                  );

                  return (
                    searchResult && (
                      <ListItem
                        key={item.id}
                        item={item}
                        //passes the state of urgency to ListItem as a prop for className and aria-label
                        //in CSS, added styling for class names (background colour)
                        index="soon"
                        shoppingList={shoppingList}
                      />
                    )
                  );
                })}
              </div>
            )}

            {kindOfSoonArr.length && (
              <div className="container__kind-of-soon">
                {kindOfSoonArr.map((item) => {
                  const searchResult = item.name.includes(
                    value.toLowerCase().trim(),
                  );

                  return (
                    searchResult && (
                      <ListItem
                        key={item.id}
                        item={item}
                        index="kind-of-soon"
                        shoppingList={shoppingList}
                      />
                    )
                  );
                })}
              </div>
            )}

            {notSoonArr.length && (
              <div className="container__not-soon">
                {notSoonArr.map((item) => {
                  const searchResult = item.name.includes(
                    value.toLowerCase().trim(),
                  );

                  return (
                    searchResult && (
                      <ListItem
                        key={item.id}
                        item={item}
                        index="not-soon"
                        shoppingList={shoppingList}
                      />
                    )
                  );
                })}
              </div>
            )}
            {inactiveArr.length && (
              <div className="container__inactive">
                {inactiveArr.map((item) => {
                  const searchResult = item.name.includes(
                    value.toLowerCase().trim(),
                  );

                  return (
                    searchResult && (
                      <ListItem
                        key={item.id}
                        item={item}
                        index="inactive"
                        shoppingList={shoppingList}
                      />
                    )
                  );
                })}
              </div>
            )}
          </ul>
        </main>
      )}
    </>
  );
};

export default ListView;
