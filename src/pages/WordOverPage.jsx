import React from 'react';
import styles from '../styles/WordOverPage.module.css';
import background from "../assets/background.png";


const WordOverPage = () => {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.topContainer}>
                <span>내 점수: 20</span>
                <div className={styles.nickInput}>
                    <input/>
                </div>

            </div>
        </div>
    );
};

export default WordOverPage;
