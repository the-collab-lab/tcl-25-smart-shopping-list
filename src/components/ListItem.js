import React, { useState } from 'react';

import Checkbox from '../components/Checkbox';
import BinIcon from '../components/BinIcon';
import Dialog from '../components/Dialog';

import { db } from '../lib/firebase';
import firebase from 'firebase';

const ListItem = ({ index, item, shoppingList }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleDeleteItem = async (listId, item) => {
    return await db
      .collection('lists')
      .doc(listId)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(item),
      });
  };

  const handleRemove = async () => {
    setDialogOpen(false);
    await handleDeleteItem(shoppingList[0].id, item);
  };

  return (
    <li>
      <Checkbox index={index} item={item} shoppingList={shoppingList} />
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
