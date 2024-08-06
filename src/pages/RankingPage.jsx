// import React from 'react';
import styles from '../styles/RankingPage.module.css'
import background from '../assets/rankingBg.png';
import avatar from '../assets/avatar.png'
import gold from '../assets/goldMedal.png'
import silver from '../assets/silverMedal.png'
import bronze from '../assets/bronzeMedal.png'
import MidBtn from '../assets/midBtn.png'
import RankingItem from "../components/RankingItem.jsx";

// You can replace 'PageComponent' with the name of your component
const RankingPage = () => {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.title}>요망진 아이들</div>
            <div className={styles.btnContainer}>
                <button
                    className={styles.midBtn}
                    style={{backgroundImage: `url(${MidBtn})`}}
                >단어 순위
                </button>
                <button
                    className={styles.midBtn}
                    style={{backgroundImage: `url(${MidBtn})`}}
                >장문 순위
                </button>
            </div>
            <div className={styles.innerContainer}>

                <div className={styles.innerTopContainer}>
                    <div className={styles.boxGroup}>
                        <div className={styles.smallBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={silver} alt="silver-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>2등쥬디</div>
                        <div className={styles.boxScore}>30점</div>
                    </div>
                    <div className={styles.boxGroup}>
                        <div className={styles.bigBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={gold} alt="gold-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>1등쥬디</div>
                        <div className={styles.boxScore}>30점</div>
                    </div>
                    <div className={styles.boxGroup}>
                        <div className={styles.smallBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={bronze} alt="silver-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>3등쥬디</div>
                        <div className={styles.boxScore}>30점</div>
                    </div>
                </div>
                <div className={styles.rankingContainer}>
                    <RankingItem/>
                    <RankingItem/>
                    <RankingItem/>
                    <RankingItem/>
                    <RankingItem/>
                    <RankingItem/>
                    <RankingItem/>

                </div>
            </div>


        </div>
    );
};


export default RankingPage;
