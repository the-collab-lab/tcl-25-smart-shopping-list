import React from 'react';
import { db } from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ListView = () => {
  const [purchaseItemCollection] = useCollectionData(db.collection('LA'), {
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
