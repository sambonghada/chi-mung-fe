import React from 'react';
import styles from '../styles/DictationPage.module.css';
import background from "../assets/dictationBg.png";

const DictationPage = () => {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.note}></div>
        </div>
    );
};

export default DictationPage;
