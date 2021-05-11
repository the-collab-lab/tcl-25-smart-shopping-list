import React from 'react';
import Checkbox from '../components/Checkbox';

const ListItem = ({ index, item, shoppingList }) => (
  <li className={index}>
    <Checkbox item={item} shoppingList={shoppingList} />
  </li>
);

export default ListItem;
