import React from 'react';
import { db } from '../../lib/firebase.js';
import { formatString } from '../../lib/helpers.js';
import moment from 'moment';
import './List.css';

export default function List({ items, token }) {
  const purchaseItem = (item) => {
    const normalizedName = formatString(item.name);
    db.collection('lists')
      .doc(token)
      .update({
        [normalizedName]: {
          name: item.name,
          frequency: item.frequency,
          lastPurchased: new Date(),
        },
      });
  };

  const isChecked = (item) => {
    if (item.lastPurchased === null) {
      return false;
    } else {
      const time = moment();
      const purchasedAt = moment(item.lastPurchased.toDate());
      const diff = time.diff(purchasedAt, 'h'); //s to h once fixed

      return diff <= 24;
    }
  };

  return (
    <div className="List">
      <h3>Item List:</h3>
      <ul>
        {items.map((item) => {
          let checked = isChecked(item);

          return (
            <div>
              <input
                type="checkbox"
                className="checked"
                id={item.name}
                onChange={() => purchaseItem(item)}
                checked={checked}
                disabled={checked}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
