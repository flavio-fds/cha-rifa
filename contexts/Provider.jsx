import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [registeredUser, setRegisteredUser] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(['3', '5']);

  const myContext = {
    selectedNumber,
    setSelectedNumber,
    registeredUser,
    setRegisteredUser,
  };

  return (
    <Context.Provider value={ myContext }>
      {children}
    </Context.Provider>
  );
}
