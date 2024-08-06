import React from 'react';
import styles from '../styles/whiteRankingItem.module.css';

const RankingItem = ({index, username, score}) => {

    return (
        <div className={styles.container} style={{backgroundColor:"white"}} >
            <div className={styles.ranking}>
                {index}
            </div>
            <div className={styles.nickname}>
                {username}
            </div>
            <div className={styles.score}>{score}점</div>

        </div>
    );
};

export default RankingItem;
