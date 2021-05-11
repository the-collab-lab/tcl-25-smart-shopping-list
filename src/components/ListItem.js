import React, { useState } from 'react';

import Checkbox from '../components/Checkbox';
import BinIcon from '../components/BinIcon';
import Dialog from '../components/Dialog';

const ListItem = ({ item, shoppingList }) => (
  <li className="list__item">
    <Checkbox item={item} shoppingList={shoppingList} />
  </li>
);

export default ListItem;
