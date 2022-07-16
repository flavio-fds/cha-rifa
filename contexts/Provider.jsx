import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [registeredUser, setRegisteredUser] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState([]);
  const [statusNumbersBuyer, setStatusNumbersBuyer] = useState([])
  const [statusRegister, setStatusRegister] = useState(false);
  const [userRegistered, setUserRegistered] = useState({});
  const [raffleNumber, setRaffleNumber] = useState(200);


  const myContext = {
    selectedNumber,
    setSelectedNumber,
    registeredUser,
    setRegisteredUser,
    statusNumbersBuyer,
    setStatusNumbersBuyer,
    statusRegister,
    setStatusRegister,
    userRegistered,
    setUserRegistered,
    raffleNumber,
  };

  return (
    <Context.Provider value={ myContext }>
      {children}
    </Context.Provider>
  );
}
