// import React from 'react';
import styles from '../styles/whiteRankingItem.module.css';

const RankingItem = () => {

    return (
        <div className={styles.container}>
            <div className={styles.ranking}>
                1
            </div>
            <div className={styles.nickname}>
                쥬디공쥬
            </div>
            <div className={styles.score}>30점</div>

        </div>
    );
};

export default RankingItem;
