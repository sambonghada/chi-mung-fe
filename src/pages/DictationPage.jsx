import React from 'react';
import styles from '../styles/DictationPage.module.css';
import background from "../assets/dictationBg.png";
import DictationItem from "../components/DictationItem.jsx";

const DictationPage = () => {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.note}>
                <div className={styles.itemContainer}>
                    <DictationItem />

                </div>


            </div>
        </div>
    );
};

export default DictationPage;
