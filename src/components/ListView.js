import React from 'react';
import { db } from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ListView = () => {
  let token = localStorage.length !== 0 ? localStorage.getItem('token') : 'LA';
  const [purchaseItemCollection] = useCollectionData(db.collection(token), {
    idField: 'id',
  });
  return (
    <ul className="lists">
      {purchaseItemCollection &&
        purchaseItemCollection.map((item) => (
          <li key={item.id}>{item.purchaseItem}</li>
        ))}
    </ul>
  );
};

export default ListView;
