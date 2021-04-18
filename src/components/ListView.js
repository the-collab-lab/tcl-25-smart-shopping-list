import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

const ListView = ({ token }) => {
  const [purchaseItemCollection, setpurchaseItemCollection] = useState([]);

  useEffect(() => {
    db.collection('shoppinglist')
      .where('token', '==', token)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setpurchaseItemCollection(doc.data().items);
        });
      });
  });

  return (
    <ul className="lists">
      {purchaseItemCollection &&
        purchaseItemCollection.map((item) => (
          <li key={uuidv4()}>{item.name}</li>
        ))}
    </ul>
  );
};

export default ListView;
