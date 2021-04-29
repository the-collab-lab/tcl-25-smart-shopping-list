import React from 'react';

const ListItem = ({ item, shoppingList }) => {
  const { name } = item;
  return <li className="list__item">{name}</li>;
};

export default ListItem;
