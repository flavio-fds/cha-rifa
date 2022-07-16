import styles from '../styles/Header.module.css';
import Image from 'next/image';
import babyone from '../images/babyone.png';
import babytwo from '../images/babytwo.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src={babyone}
        alt="babyone"
        width="60"
        height="70"
      />
      <div className={styles.title}>
        <h1 className={styles.title}>Chá Rifa do</h1>
        <h1 className={styles.title}>Paulo Manoel</h1>
      </div>
      <Image
        src={babytwo}
        alt="babytwo"
        width="70"
        height="70"
      />
    </header>
  )
}
