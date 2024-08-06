import React from 'react';
import styles from '../styles/ParagraphOverPage.module.css';
import background from "../assets/paragraph_bg.png";


const ParagraphOverPage = () => {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.note}>
                <div className={styles.itemContainer}>


                </div>


            </div>
        </div>
    );
};

export default ParagraphOverPage;
