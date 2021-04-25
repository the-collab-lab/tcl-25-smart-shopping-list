import React from 'react';

const ListItem = ({ item }) => {
  const { name } = item;
  return <li className="list__item">{name}</li>;
};

export default ListItem;
