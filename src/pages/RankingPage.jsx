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

const baseURL = import.meta.env.VITE_BASE_URL;

// You can replace 'PageComponent' with the name of your component
const RankingPage = () => {
    const [rankings, setRankings] = useState([]);
    const [isWordRankFlag, setIsWordRankFlag] = useState(true);


    useEffect(() => {
        // Replace 'your-backend-url' with your actual API endpoint
        let path = isWordRankFlag ? "word" : "paragraph"
        axios.get(`${baseURL}/api/scores/top10/${path}`)
            .then(response => {
                setRankings(response.data); // Assuming the response data is an array of rankings
            })
            .catch(error => {
                console.error('Error fetching rankings:', error);
            });
    }, [isWordRankFlag]);
    return (
        <div className={styles.container} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.title}>요망진 아이들</div>
            <div className={styles.btnContainer}>
                <button
                    className={styles.midBtn}
                    onClick={() => setIsWordRankFlag(true)}
                    style={{backgroundImage: `url(${MidBtn})`}}
                >단어 순위
                </button>
                <button
                    className={styles.midBtn}
                    onClick={() => setIsWordRankFlag(false)}
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
                        <div className={styles.boxNickname}>{rankings[1] ? rankings[1].username : "2등쥬디"}</div>
                        <div className={styles.boxScore}>{rankings[1] ? `${rankings[1].score}점` : "30점"}</div>
                    </div>
                    <div className={styles.boxGroup}>
                        <div className={styles.bigBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={gold} alt="gold-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>{rankings[0] ? rankings[0].username : "1등쥬디"}</div>
                        <div className={styles.boxScore}>{rankings[0] ? `${rankings[0].score}점` : "30점"}</div>
                    </div>
                    <div className={styles.boxGroup}>
                        <div className={styles.smallBox}>
                            <img src={avatar} alt="avatar-rock" className={styles.avatar}/>
                            <img src={bronze} alt="silver-medal" className={styles.medal}/>
                        </div>
                        <div className={styles.boxNickname}>{rankings[2] ? rankings[2].username : "3등쥬디"}</div>
                        <div className={styles.boxScore}>{rankings[2] ? `${rankings[2].score}점` : "30점"}</div>
                    </div>
                </div>
                <div className={styles.rankingContainer}>
                    {rankings[3] && (
                        <RankingItem index={4} score={rankings[3].score} username={rankings[3].username}/>
                    )}
                    {rankings[4] && (
                        <RankingItem index={5} score={rankings[4].score} username={rankings[4].username}/>
                    )}
                    {rankings[5] && (
                        <RankingItem index={6} score={rankings[5].score} username={rankings[5].username}/>
                    )}
                    {rankings[6] && (
                        <RankingItem index={7} score={rankings[6].score} username={rankings[6].username}/>
                    )}
                    {rankings[7] && (
                        <RankingItem index={8} score={rankings[7].score} username={rankings[7].username}/>
                    )}
                    {rankings[8] && (
                        <RankingItem index={9} score={rankings[8].score} username={rankings[8].username}/>
                    )}
                    {rankings[9] && (
                        <RankingItem index={10} score={rankings[9].score} username={rankings[9].username}/>
                    )}
                </div>

            </div>


        </div>
    );
};


export default RankingPage;
