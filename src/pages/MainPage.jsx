import React from 'react';
import { FaCrown } from 'react-icons/fa';
// import LongBtn from '../assets/Longbtn.png';
// import LongBtnClicked from '../assets/Longbtn_clicked.png';
import background from '../assets/mainBg.png';
import styles from '../styles/MainPage.module.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const rankingNavigate = () => {
        navigate('/ranking');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.buttons}>
                {['단어 연습', '장문 연습', '받아 쓰기'].map((text, index) => {
                    let path = '';
                    if (text === '단어 연습') path = '/word';
                    if (text === '장문 연습') path = '/paragraphList';
                    if (text === '받아 쓰기') path = '/dictation';

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
                <div className={styles.bottomBtnContainer}>
                <button className={styles.white_box} onClick={rankingNavigate}>
                    <FaCrown />
                    <span>랭킹</span>
                </button>
                <button className={styles.white_box} onClick={rankingNavigate}>
                    <FaCrown />
                    <span>랭킹</span>
                </button>
                </div>
                
            </div>
        </div>
    );
};

export default MainPage;
