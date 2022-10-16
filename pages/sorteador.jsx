import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllUser } from "../service/DataUser";
import { getStatusNumber } from "../service/NumberRaffle";
import styles from '../styles/Sorteador.module.css';
import Image from 'next/image';
import babyone from '../images/babyone.png';
import babytwo from '../images/babytwo.png';

export default function Sorteador() {
    const [allUser, setAllUser] = useState([]);
    const [allNumber, setAllNumber] = useState([]);
    const [numberWin, setNumberWin] = useState(0)
    const [start, setStart] = useState(false)
    const [totalTimeInseconds, setTotalTimeInSeconds] = useState(6);

    const seconds = totalTimeInseconds % 60;

    useEffect(() => {
        if (start) {
            if (totalTimeInseconds === 0) {
                console.log(0);
                return
            } else {
                setTimeout(() => {
                    setTotalTimeInSeconds(totalTimeInseconds - 1)
                }, 1000)
            }
        }
    }, [totalTimeInseconds, start])

    const getAllDateDB = async () => {
        const userDate = await getAllUser();
        const numberDate = await getStatusNumber();
        setNumberWin(parseInt((Math.random() * 200) + 1));
        setAllNumber(numberDate);
        setAllUser(userDate);
        setTotalTimeInSeconds(6);
        setStart(true);
    }

    const showWin = () => {
        const result = allNumber.find(({ number }) => number === numberWin);
        if (!result) {
            return `Numero ${numberWin} não comprado`
        }
        const nameWin = allUser.find(({ numberPhone }) => numberPhone === result.buyerId);
        return `O ganhador é ${nameWin.name} com o numero ${numberWin}`;
    }

    return (
        <header className={styles.header}>
            <div className={styles.run}>
            <Image
                src={babyone}
                alt="babyone"
                width="130"
                height="140"
            />
            <button className={styles.button} onClick={getAllDateDB}>Sortear Numero</button>
            <Image
                src={babytwo}
                alt="babytwo"
                width="140"
                height="140"
            />
            </div>
            <div className={styles.number}>{seconds.toString().padStart(2, "0")}</div>
            {totalTimeInseconds === 0 && <div className={styles.title}>{showWin()}</div>}
        </header>
    )
}
