import React from 'react';
import BackgroundImage from '../assets/chi-mung-bg.png';
import Shortbtn from '../assets/Shortbtn.png';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const mainNavigate = () => {
        navigate('/main');
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className={styles.logo_container}>
                {['배', '우', '멍', '치', '멍'].map((char, index) => (
                    <div key={index} className={styles.logo} style={{ backgroundImage: `url(${Shortbtn})` }}>
                        <p className={styles.logo_text}>{char}</p>
                    </div>
                ))}
            </div>
            <button className={`${styles.btn} ${styles.effect5}`} onClick={mainNavigate}>
                혼저옵서예
            </button>
        </div>
    );
};

export default LandingPage;
