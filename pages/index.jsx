import Header from '../components/Header';
import User from '../components/User';
import Raffle from '../components/Raffle';
import Footer from '../components/Footer';
import { useContext } from 'react';
import Context from '../contexts/Context';
import { useEffect } from 'react';
import { getStatusNumber } from '../service/NumberRaffle';

export default function Home({numbers}) {
  const { setStatusNumbersBuyer } = useContext(Context);

  useEffect(()=> {
    const setNumbersAndStates = () => {
      const newArrayNumber = numbers.map( ({number, status }) => ({number, status}));
      setStatusNumbersBuyer(newArrayNumber);
    }
    setNumbersAndStates();
  },[numbers, setStatusNumbersBuyer])
  return (
    <div>  
      <Header />
      <main>
        <User />
        <Raffle statusNumbers={numbers}/>
      </main>
      <Footer />
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const res = await fetch('http://localhost:3000/api/allNumbers')
//   const numbers = await res.json()
//   return {
//     props: { numbers },
//   }
// }

export const getServerSideProps = async () => {
  const numbers = await getStatusNumber();
  return {
    props: { numbers },
  }
}

