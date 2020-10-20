import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function ExistingTokenButton({ setToken }) {
  const [input, setInput] = useState('');
  let history = useHistory();
  const { register } = useForm();

  const handleClick = (event) => {
    event.preventDefault();
    if (input === '') {
      alert('Enter a valid token');
    } else {
      db.collection('lists')
        .doc(input)
        .onSnapshot(function (querySnapshot) {
          if (querySnapshot.exists) {
            localStorage.setItem('token', input);
            setToken(input);
            history.push('/list');
          } else {
            alert('Shopping list does not exist. Try again or get a new token');
          }
        });
    }
  };

  return (
    <div className="token">
      <form>
        <input
          label="Enter Token"
          name="EnterToken"
          id="joinList"
          type="text"
          placeholder="Three word token"
          defaultValue=""
          aria-label="Enter three word token"
          aria-required="true"
          onChange={(event) => setInput(event.target.value)}
          ref={register}
        ></input>
        <br />
        <button type="submit" onClick={handleClick}>
          Join an existing list
        </button>
      </form>
    </div>
  );
}
