import React, { useState } from 'react';

import Checkbox from './Checkbox';
import BinIcon from './BinIcon';
import Dialog from './Dialog';

import { db } from '../lib/firebase';
import firebase from 'firebase';

const ListItem = ({ index, ariaLabel, item, shoppingList }) => {
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
    <div className="list__item">
      <Checkbox
        index={index}
        item={item}
        ariaLabel={ariaLabel}
        shoppingList={shoppingList}
      />
      <button
        onClick={handleDialogOpen}
        aria-label={`delete ${item.name}`}
        className="list__item__delete-btn"
        id="bin-icon"
      >
        <BinIcon />
      </button>
      {dialogOpen ? (
        <Dialog onCancel={handleCancel} onDelete={handleRemove} />
      ) : null}
    </div>
  );
};

export default ListItem;
