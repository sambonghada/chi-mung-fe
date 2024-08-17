import { useRef } from "react";
import background from '../assets/mainBg.png';
import styles from '../styles/MainPage.module.css';
import { useNavigate } from 'react-router-dom';
import clickSound from "../assets/click.mp3"; // 효과음 추가

const GameListPage = () => {
    const navigate = useNavigate();
    const clickAudioRef = useRef(new Audio(clickSound));

    const handleNavigation = (path) => {
        navigate(path);
        clickAudioRef.current.play();
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
