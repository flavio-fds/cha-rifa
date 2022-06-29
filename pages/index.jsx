import { useState } from 'react';
import styles from '../styles/Container.module.css';
import Header from '../components/Header';
import User from '../components/User';
import Raffle from '../components/Raffle';
import Footer from '../components/Footer';

export default function Home() {

  return (
    <div className={styles.container}>  
      <Header />
      <main>
        <User />
        <Raffle />
      </main>
      <Footer />
    </div>
  )
}
