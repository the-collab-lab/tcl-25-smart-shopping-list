import React, { useState, useEffect } from 'react';

import { db } from '../lib/firebase';

const Checkbox = ({ item, shoppingList }) => {
  const [checked, setChecked] = useState(false);

  const { name, id, lastPurchasedDate } = item;

  return <div></div>;
};

export default Checkbox;
