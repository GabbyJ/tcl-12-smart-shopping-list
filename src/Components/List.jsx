import React from 'react';
import { useHistory } from 'react-router-dom';

export default function List({ items }) {
  let history = useHistory();

  const redirectPath = () => {
    history.push('/add-item');
  };

  return (
    <div className="List">
      {items.length === 0 ? (
        <React.Fragment>
          <h3>Your shopping list is empty.</h3>
          <button onClick={redirectPath}>Add New Item</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>Item List:</h3>

          <ul>
            {items.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
}

// To do:
// - If the itemList array is empty, show button to add first item
// Use react-router to re-route to add item page
// - If the itemList array is not empty, show the list
