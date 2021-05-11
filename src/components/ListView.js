import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';

const ListView = ({ shoppingList, loading, error }) => {
  const [shoppingListEmpty, setShoppingListEmpty] = useState(true);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');

  const [soonArr, setSoonArr] = useState([]);
  const [kindOfSoonArr, setKindOfSoonArr] = useState([]);
  const [notSoonArr, setNotSoonArr] = useState([]);
  //const [inactiveArr, setInactiveArr] = useState([]);

  const handleChange = (e) => setValue(e.target.value);

  useEffect(() => {
    const filterUrgency = () => {
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

      setSoonArr(soonItems.sort((a, b) => a.name.localeCompare(b.name)));
      setKindOfSoonArr(
        kindOfSoonItems.sort((a, b) => a.name.localeCompare(b.name)),
      );
      setNotSoonArr(notSoonItems.sort((a, b) => a.name.localeCompare(b.name)));
      console.log(shoppingList[0]);
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

            <div className="container__inactive"></div>
          </ul>
          {/*
              
              shoppingList[0].items.map((item) => {
                const searchResult = item.name.includes(
                  value.toLowerCase().trim(),
                );
                const nextPurchase = item.daysLeftForNextPurchase;
                checkIndex(nextPurchase);

                return (
                  searchResult && (
                    <ListItem
                      key={item.id}
                      item={item}
                      index={purchaseIndex}
                      shoppingList={shoppingList}
                    />
                  )
                );
              })} */}
        </main>
      )}
    </>
  );
};

export default ListView;
