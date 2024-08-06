// WordOverPage.jsx
import React from 'react';
import styles from '../styles/WordOverPage.module.css';
import background from "../assets/background.png";
import RankingItem from "../components/RankingItem.jsx";
import Shortbtn from '../assets/Shortbtn.png';
import LongBtn from '../assets/Longbtn.png';
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGame } from '../components/GameContext.jsx';

const WordOverPage = () => {
    const navigate = useNavigate();
    const { score } = useGame(); // Context에서 점수 가져오기

    const replayNavigate = () => {
        navigate('/word');
    }

    const homeNavigate = () => {
        navigate('/main');
    }

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.topContainer}>
                <span>내 점수: {score}</span> {/* 점수 표시 */}
                <div className={styles.nickInput}>
                    <input type="text" placeholder="닉네임을 입력해주세요." />
                    <button>랭킹 등록</button>
                </div>
            </div>
            <div className={styles.rankingContainer}>
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
                <RankingItem backgroundColor="white" />
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.shortBtn} style={{ backgroundImage: `url(${Shortbtn})` }} onClick={replayNavigate}>
                    <MdOutlineReplay className={styles.icon} />
                </button>
                <button className={styles.longBtn} style={{ backgroundImage: `url(${LongBtn})` }} onClick={homeNavigate}>
                    <span>홈으로 가기</span>
                </button>
            </div>
        </div>
    );
};

export default WordOverPage;
