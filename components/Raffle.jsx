import { useContext, useState } from 'react';
import Context from '../contexts/Context';
import styles from '../styles/Raffle.module.css';
import { getDataUser } from '../service/DataUser';
import { getNumberBuyerUser, postNumberBuyerUser, getStatusNumber } from '../service/NumberRaffle';

export default function Raffle() {
  const [loading, setLoading] = useState(false);
  const { selectedNumber, setSelectedNumber, statusNumbersBuyer, raffleNumber,
    statusRegister, userRegistered, setStatusNumbersBuyer, setUserRegistered } = useContext(Context);

  const addOrRemoveNumber = ({ target: { innerText } }) => {
    const checkBuy = statusNumbersBuyer.some(({ number }) => +number === +innerText)
    if (!checkBuy) {
      if (selectedNumber.some(n => n === innerText)) {
        setSelectedNumber((prevN) => prevN.filter((number) => number !== innerText));
      } else {
        setSelectedNumber((prevN) => [...prevN, innerText]);
      }
    }
  }

  const bayNumbes = async () => {
    const checkNumberSelected = selectedNumber.length > 0;
    const checkRegister = statusRegister;
    if (checkNumberSelected && checkRegister) {
      setLoading(true);
      const numbers = await getStatusNumber();
      if (numbers) {
        const checkNumberBuyer = selectedNumber.filter(n => numbers.some(({ number }) => +number === +n));
        if (checkNumberBuyer.length === 0) {

          const resultResponse = [];

          for (let index = 0; index < selectedNumber.length; index++) {
            const dataNumbersBuyer = { number: +selectedNumber[index], status: "p", buyerId: userRegistered.numberPhone };
            const resultBuyer = await postNumberBuyerUser(dataNumbersBuyer);
            !resultBuyer && resultResponse.push(selectedNumber[index]);
          }

          const updatedNumbers = await getStatusNumber();
          updatedNumbers && setStatusNumbersBuyer(updatedNumbers.map(({ number, status }) => ({ number, status })));
          setSelectedNumber([])
          const newData = await getDataUser({ name: userRegistered.name, numberPhone: userRegistered.numberPhone });
          const numberBuyerUser = await getNumberBuyerUser({ name: userRegistered.name, numberPhone: userRegistered.numberPhone })
          if (newData && numberBuyerUser) {
            const arrayNumberBuyerUser = numberBuyerUser.length > 0 ? numberBuyerUser.map(e => e.number) : [];
            setUserRegistered({ ...newData[0], bay: arrayNumberBuyerUser });
            setLoading(false);
          }

          if (resultResponse.length > 0) {
            setLoading(false);
            global.alert(`Erro na compra ${resultResponse.length > 1 ? "dos numeros" : "do numero"} ${resultResponse.toString()}, tente ${resultResponse.length > 1 ? "compralos" : "compralo"} novamente ou escolha ${resultResponse.length > 1 ? "outros numeros." : "outro numero."}`);
          }

          if (resultResponse.length === 0) {
            setLoading(false);
            global.alert(`Uhuuu, ${userRegistered.name} você comprou ${resultResponse.length > 1 ? "os numeros" : "o numero"} ${selectedNumber.toString()}`);
          }

        } else {
          checkNumberBuyer.forEach(numberBuyer => addOrRemoveNumber({ target: { innerText: numberBuyer } }));
          setStatusNumbersBuyer(numbers.map(({ number, status }) => ({ number, status })));
          setLoading(false);
          global.alert(`${checkNumberBuyer.length > 1 ? 'Os numeros' : 'O numero'} ${checkNumberBuyer.toString()} já foram comprados, selecione outros!!!`);
        }

      } else {
        setLoading(false);
        global.alert('Tente novamente!!!')
      }

    } else {
      global.alert(`${!checkRegister ? 'cadastre-se' : ''}${!checkNumberSelected && !checkRegister ? ' e ' : ''}${!checkNumberSelected ? 'selecione algun numero' : ''}!!!`)
    }
  }

  const setColorClassName = (index) => {
    const classRaffle = 'number-raffle'
    const classSelected = selectedNumber.some(e => +e === +index) ? ' selected-number' : '';
    const classRequested = statusNumbersBuyer.some(({ number, status }) => status === "p" && +number === +index) ? ' requested-number' : '';
    const classBuy = statusNumbersBuyer.some(({ number, status }) => status === "a" && +number === +index) ? ' buy-number' : '';

    return `${classRaffle}${classSelected}${classRequested}${classBuy}`;
  }

  const creatNumberRaflle = () => {
    const arrayNumber = []
    for (let index = 1; index <= raffleNumber; index++) {
      arrayNumber.push(
        <div
          className={setColorClassName(index)}
          onClick={addOrRemoveNumber}
          key={index}
        >
          {index}
        </div >
      )
    }
    return arrayNumber;
  }
  return (
    <>
      {statusRegister && <hr />}
      {statusRegister && (
        <div className={styles.numberBuyer}>
          <div className={styles.numberBuyerSelected}>
            <p>Selecionados: </p>
            {selectedNumber.map((number) => (
              <div
                key={number}
                onClick={addOrRemoveNumber}
              >
                {number}
              </div>
            ))}
          </div>
          {loading ?
            <div className={styles.test}>
              <div className={styles.loader}></div>
            </div>
            : <button
              type='button'
              onClick={bayNumbes}
            >
              Reservar
            </button>
          }
        </div>
      )}
      <hr />
      <div className={styles.numberRaflle}>
        {creatNumberRaflle()}
      </div>
      <hr />
      <div className={styles.indexColor}>
        <p className={styles.indexColorWhite}>Disponível</p>
        <p className={styles.indexColorBlue}>Selecionado</p>
        <p className={styles.indexColorYellon}>Reservado</p>
        <p className={styles.indexColorGreen}>Confirmado</p>
      </div>
      <hr />
    </>
  )
}
