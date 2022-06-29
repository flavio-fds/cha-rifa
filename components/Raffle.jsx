import { useContext, useState } from 'react';
import Context from '../contexts/Context';
// import styles from '../styles/Raffle.module.css';

export default function Raffle() {
  const { selectedNumber, setSelectedNumber } = useContext(Context);
  const [raffleNumber, setRaffleNumber] = useState(200);
  const [requestedNumber, setRequestedNumber] = useState([]);
  const [buyNumber, setBuyNumber] = useState([2]);

  const addOrRemoveNumber = ({ target }) => {
    const { innerText } = target;
    const checkBuy = buyNumber.some(e => +e === +innerText)
    const checkRequested = requestedNumber.some(e => +e === +innerText)
    console.log("checkBuy", checkBuy);
    console.log("checkRequested", checkRequested);
    if (!checkBuy && !checkRequested) {
      if (selectedNumber.some(n => n === innerText)) {
        setSelectedNumber((prevN) => prevN.filter((number) => number !== innerText));
      } else {
        setSelectedNumber((prevN) => [...prevN, innerText]);
      }
    }

  }

  const setColorClassName = (index) => {
    const classRaffle = 'number-raffle'
    const classSelected = selectedNumber.some(e => +e === +index) ? ' selected-number' : '';
    const classRequested = requestedNumber.some(e => +e === +index) ? ' requested-number' : '';
    const classBuy = buyNumber.some(e => +e === +index) ? ' buy-number' : '';

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
    <section className='raffle-container'>
      {creatNumberRaflle()}
    </section>
  )
}
