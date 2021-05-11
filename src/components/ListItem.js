import React, { useState } from 'react';

import Checkbox from '../components/Checkbox';
import BinIcon from '../components/BinIcon';
import Dialog from '../components/Dialog';

import { db } from '../lib/firebase';
import firebase from 'firebase';

const ListItem = ({ item, shoppingList }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <li className="list__item">
      <Checkbox item={item} shoppingList={shoppingList} />
    </li>
  );
};

export default ListItem;
