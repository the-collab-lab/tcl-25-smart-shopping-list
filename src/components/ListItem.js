import React, { useState } from 'react';

import Checkbox from '../components/Checkbox';
import BinIcon from '../components/BinIcon';
import Dialog from '../components/Dialog';

import { db } from '../lib/firebase';
import firebase from 'firebase';

const ListItem = ({ item, shoppingList }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleRemove = async () => {
    console.log('handleRemove');
  };

  return (
    <li className="list__item">
      <Checkbox item={item} shoppingList={shoppingList} />
      <button
        onClick={handleDialogOpen}
        aria-label={`delete ${item.name}`}
        className="list__item__delete-btn"
      >
        <BinIcon />
      </button>
      {dialogOpen ? (
        <Dialog onCancel={handleCancel} onDelete={handleRemove} />
      ) : null}
    </li>
  );
};

export default ListItem;
