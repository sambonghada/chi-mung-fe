import React from 'react';
import { FaCrown } from 'react-icons/fa';
// import LongBtn from '../assets/Longbtn.png';
// import LongBtnClicked from '../assets/Longbtn_clicked.png';
import background from '../assets/mainBg.png';
import styles from '../styles/MainPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaBook } from "react-icons/fa";

const GameListPage = () => {
    const navigate = useNavigate();

    const rankingNavigate = () => {
        navigate('/ranking');
    };

    const proberbNavigate = () => {
        navigate('/proverb');
    };


    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.gamebuttons}>
                {['단어 연습', '장문 연습'].map((text, index) => {
                    let path = '';
                    if (text === '단어 연습') path = '/word';
                    if (text === '장문 연습') path = '/paragraphList';

                    return (
                        <button
                            key={index}
                            className={styles.LongBtn}
                            // style={{ backgroundImage: `url(${LongBtn})` }}
                            onClick={() => handleNavigation(path)}
                        >
                            <p className={styles.LongBtn_text}>{text}</p>
                        </button>
                    );
                })}
            
                
            </div>
        </div>
    );
};

export default GameListPage;
