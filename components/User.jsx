import { useContext, useEffect, useState } from 'react';
import Context from '../contexts/Context';
import styles from '../styles/User.module.css';
import { getDataUser, postDataUser } from '../service/DataUser';
import { getNumberBuyerUser } from '../service/NumberRaffle';

export default function User() {
  const [userInput, setUserInput] = useState({ name: '', numberPhone: '' });
  const [confirmRegistrationData, setConfirmRegistrationData] = useState(false);
  const [confirmNameDataUser, setConfirmNameDataUser] = useState(false);
  const [inputRegister, setInputRegister] = useState(true);
  const [dataGetDataUser, setDataGetDataUser] = useState([]);
  const { statusRegister, setStatusRegister, userRegistered, setUserRegistered } = useContext(Context);

  // function phoneMask(number) {
  //   let r = number.replace(/\D/g, "");
  //   r = r.replace(/^0/, "");
  //   return r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  // }

  const phoneMask = number => number.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");

  const nameClean = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const handleChangeUser = ({ target: { name, value } }) => {
    const numberPhoneCheck = (Number(value) && value.length <= 11) || value === '';
    if (name === 'name' || numberPhoneCheck) setUserInput((prev) => ({ ...prev, [name]: value }))
  };

  const startUserRegistered = async (data) => {
    setConfirmNameDataUser(false);
    const numberBuyerUser = await getNumberBuyerUser(userInput);
    const arrayNumberBuyerUser = numberBuyerUser.length > 0 ? numberBuyerUser.map(e => e.number) : [];
    setUserRegistered({ ...data[0], bay: arrayNumberBuyerUser });
    setStatusRegister(true);
  }

  const confirmRegister = () => {
    const nameCheked = userInput.name.length > 3;
    const numberPhoneCheked = userInput.numberPhone.length > 10;
    if (nameCheked && numberPhoneCheked) {
      setInputRegister(false);
      setConfirmRegistrationData(true);
    } else {
      global.alert(`Digite o ${!nameCheked ? 'um nome ' : ''}${!nameCheked && !numberPhoneCheked ? 'e ' : ''}${!numberPhoneCheked ? 'numero de telefone' : ''} correto!!! Ex: 99 9 9999 9999`);
    }
  };

  const editDataUser = () => {
    // setUserInput({ name: '', numberPhone: '' });
    setConfirmRegistrationData(false);
    setInputRegister(true);
    setConfirmNameDataUser(false)
  }

  const register = async () => {
    setConfirmRegistrationData(false)
    const data = await getDataUser(userInput);
    if (data) {
      if (data.length > 0 && typeof data === 'object') {
        nameClean(data[0].name)
        if (nameClean(data[0].name) === nameClean(userInput.name)) {
          startUserRegistered(data);
        } else {
          setDataGetDataUser(data);
          setConfirmNameDataUser(true);
          setInputRegister(false);
        }

      } else if (data.length === 0 && typeof data === 'object') {
        const resulte = await postDataUser(userInput)
        if (resulte) {
          const newData = await getDataUser(userInput);
          if (newData) {
            startUserRegistered(newData);
          }
        } else { global.alert('Tente novamente!!!') }
      } else { global.alert('Tente novamente!!!') }

    } else { global.alert('Tente novamente!!!') }
  }

  return (
    <>
      <hr />
      {inputRegister
        && (<div className={styles.forms}>
          <input
            value={userInput.name}
            onChange={handleChangeUser}
            name='name'
            type="text"
            placeholder='Nome'
            className={styles.inputName}
          />
          <input
            value={userInput.numberPhone}
            onChange={handleChangeUser}
            name='numberPhone'
            type="text"
            placeholder='Telefone - 62 9 9999 9999'
            className={styles.inputPhone}
          />
          <button
            onClick={confirmRegister}
            type="button"
            className={styles.inputButton}
          >
            Cadastrar
          </button>
        </div>)}
      {statusRegister
        && (<div className={styles.registered}>

          <div className={styles.registeredUserData}>
            <p>{`Olá ${userRegistered.name}`}</p>
            <p>{phoneMask(userRegistered.numberPhone)}</p>
            <p>{`Você já comprou os numeros:`}</p>
          </div>

          {userRegistered.bay.length > 0 ? 
            <div className={styles.numberUserBuyer}>
            {userRegistered.bay.map(n => (<div key={n}>{n}</div>))}
            </div> : <div className={styles.numberUserBuyer}><div></div><div></div><div></div><div></div></div>
          }
        </div>
        )}
      {confirmRegistrationData
        && (<div className={styles.confirmInput}>
          <p>{userInput.name}</p>
          <p>{phoneMask(userInput.numberPhone)}</p>
          <div className={styles.confirmButton}>
            <button type="button" onClick={register}>Confirmar</button>
            <button type="button" onClick={editDataUser}>Alterar</button>
          </div>
        </div>
        )}
      {confirmNameDataUser
        && (<div className={styles.confirmUserRegistered}>
          <p>Cadastrado Diferente</p>
          <p>{`Nome Digitado: ${userInput.name}`}</p>
          {dataGetDataUser.length > 0 && <p>{`Nome Cadastrado: ${dataGetDataUser[0].name}`}</p>}
          <p>{`Tel: ${phoneMask(userInput.numberPhone)}`}</p>
          <div>
            <button type="button" onClick={() => startUserRegistered(dataGetDataUser)}>Entrar</button>
            <button type="button" onClick={editDataUser}>Alterar</button>
          </div>
        </div>

        )}
    </>
  )
}
