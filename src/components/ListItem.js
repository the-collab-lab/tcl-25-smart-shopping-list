import React from 'react';
import Checkbox from '../components/Checkbox';

const ListItem = ({ index, ariaLabel, item, shoppingList }) => (
  <li className={index}>
    <Checkbox item={item} ariaLabel={ariaLabel} shoppingList={shoppingList} />
  </li>
);

export default ListItem;
