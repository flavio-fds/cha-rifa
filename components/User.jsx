import { useContext, useEffect, useState } from 'react';
import Context from '../contexts/Context';
import styles from '../styles/User.module.css';
import { getDataUser, sendDataBay } from '../api/apiRaffle';

export default function User() {
  const [userInput, setUserInput] = useState({ name: '', numberPhone: '' });
  const [userRegistered, setUserRegistered] = useState({});
  const [statusRegister, setStatusRegister] = useState(false);
  const { selectedNumber, setSelectedNumber } = useContext(Context);

  const remuveNumberSelected = ({ target }) => {
    const { innerText } = target;
    setSelectedNumber((prevN) => prevN.filter((number) => number !== innerText))
  }

  const handleChangeUser = ({ target }) => {
    const { name, value } = target;
    const numberPhoneCheck = Number(value) && value.length <= 11;
    if (name === 'name' || numberPhoneCheck) setUserInput((prev) => ({ ...prev, [name]: value }))
  };

  const register = () => {
    const nameCheked = userInput.name.length > 2;
    const numberPhoneCheked = userInput.numberPhone.length > 10;
    if (nameCheked && numberPhoneCheked) {
      const data = getDataUser(userInput);
      if (data) {
        setUserRegistered(data);
        setStatusRegister(true);
      } else {
        global.alert('Tente novamente!!!');
      }
    } else {
      global.alert(`Digite o ${!nameCheked ? 'nome ' : ''}${!nameCheked && !numberPhoneCheked ? 'e ' : ''}${!numberPhoneCheked ? 'numero de telefone' : ''} correto!!!`);
    }
  };

  const bayNumbes = () => {
    const checkNumberSelected = selectedNumber.length > 0;
    const checkRegister = statusRegister;
    if (checkNumberSelected && checkRegister) {
      const dataBay = {...userRegistered, bay: [...userRegistered.bay, ...selectedNumber]}
      // console.log('comprei', dataBay);
      global.alert(`Uhuuu, ${userRegistered.name} vc comprou os numeros ${JSON.stringify(selectedNumber)}`)
      sendDataBay(dataBay)
    } else {
      global.alert(`${!checkRegister ? 'cadastre-se' : ''}${!checkNumberSelected && !checkRegister ? ' e ' : ''}${!checkNumberSelected ? 'selecione algun numero' : ''}!!!`)
    }
  }

  return (
    <section>

      {statusRegister
        ? (<div>
          <p>{`Olá ${userInput.name}`}</p>
          { userRegistered.bay.length > 0 && <p>{`Você já comprou: ${JSON.stringify(userRegistered.bay)}`}</p>}
        </div>
        )
        : (<div>
          <input
            value={userInput.name}
            onChange={handleChangeUser}
            name='name'
            type="text"
            placeholder='Nome'
          />
          <input
            value={userInput.numberPhone}
            onChange={handleChangeUser}
            name='numberPhone'
            type="text"
            placeholder='Telefone'
          />
          <button
            onClick={register}
          >
            Cadastrar
          </button>
        </div>)}
      <div>
        <span>Números Selecionados:  </span>
        {selectedNumber.map((number) => (
          <button 
            key={number} 
            onClick={remuveNumberSelected}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        type='button'
        onClick={bayNumbes}
      >
        Comprar
      </button>
    </section>
  )
}

