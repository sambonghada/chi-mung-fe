// import React from 'react';
import styles from '../styles/RankingPage.module.css'
import background from '../assets/rankingBg.png';
import avatar from '../assets/avatar.png'
import gold from '../assets/goldMedal.png'
import silver from '../assets/silverMedal.png'
import bronze from '../assets/bronzeMedal.png'
import MidBtn from '../assets/midBtn.png'
import RankingItem from "../components/RankingItem.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

// You can replace 'PageComponent' with the name of your component
const RankingPage = () => {
    const [rankings, setRankings] = useState([]);
    useEffect(() => {
        // Replace 'your-backend-url' with your actual API endpoint
        axios.get('https://k5d881cb764f0a.user-app.krampoline.com/api/scores/top10/word')
            .then(response => {
                setRankings(response.data); // Assuming the response data is an array of rankings
            })
            .catch(error => {
                console.error('Error fetching rankings:', error);
            });
    }, []);
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
                        <div className={styles.boxNickname}>{rankings[1]? rankings[1].username : "2등쥬디"}</div>
                        <div className={styles.boxScore}>{rankings[1]? `${rankings[1].score}점` : "30점"}</div>
                    </div>
                    <div className={styles.boxGroup}>
                        <div className={styles.bigBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={gold} alt="gold-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>{rankings[0]? rankings[0].username : "1등쥬디"}</div>
                        <div className={styles.boxScore}>{rankings[0]? `${rankings[0].score}점` : "30점"}</div>
                    </div>
                    <div className={styles.boxGroup}>
                        <div className={styles.smallBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={bronze} alt="silver-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>{rankings[2]? rankings[2].username : "3등쥬디"}</div>
                        <div className={styles.boxScore}>{rankings[2]? `${rankings[2].score}점` : "30점"}</div>
                    </div>
                </div>
                <div className={styles.rankingContainer}>
                    <RankingItem index={4} score={rankings[3]? rankings[3].score : 30} username={rankings[3]? rankings[3].username : "4등쥬디"}/>
                    <RankingItem index={5} score={rankings[4]? rankings[4].score : 30} username={rankings[4]? rankings[4].username : "5등쥬디"}/>
                    <RankingItem index={6} score={rankings[5]? rankings[5].score : 30} username={rankings[5]? rankings[5].username : "6등쥬디"}/>
                    <RankingItem index={7} score={rankings[6]? rankings[6].score : 30} username={rankings[6]? rankings[6].username : "7등쥬디"}/>
                    <RankingItem index={8} score={rankings[7]? rankings[7].score : 30} username={rankings[7]? rankings[7].username : "8등쥬디"}/>
                    <RankingItem index={9} score={rankings[8]? rankings[8].score : 30} username={rankings[8]? rankings[8].username : "9등쥬디"}/>
                    <RankingItem index={10} score={rankings[9]? rankings[9].score : 30} username={rankings[9]? rankings[9].username : "10등쥬디"}/>


                </div>
            </div>


        </div>
    );
};


export default RankingPage;
