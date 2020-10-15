import React, { useState } from 'react';
import { FirestoreDocument } from 'react-firestore';
import List from './List';

/**
 * Retrieves token from local storage and accesses the saved items list from Firestore
 */

export default function FirestoreList() {
  const [token, setToken] = useState('test-token');

  return (
    <FirestoreDocument
      path={`lists/${token}`}
      render={({ isLoading, data }) => {
        return isLoading ? <div>Loading</div> : <List items={data.items} />;
      }}
    />
  );
}