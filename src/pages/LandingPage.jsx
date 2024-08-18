import { useRef, useEffect } from "react";
import BackgroundImage from '../assets/landingBg.png';
import CornerLeaf from '../assets/landingCorner.png';
import Branch from '../assets/landingBranch.png';
import Lottie from 'react-lottie';
import PaperPlane from '../assets/lottie/paperPlane.json';
import Shortbtn from '../assets/Shortbtn.png';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';
import clickSound from "../assets/click.mp3"; // 효과음 추가
import backgroundSound from "../assets/main.mp3"; // 배경음 추가

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PaperPlane,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const LandingPage = () => {
    const navigate = useNavigate();
    const clickAudioRef = useRef(new Audio(clickSound));
    const backgroundAudioRef = useRef(new Audio(backgroundSound));

    useEffect(() => {
        // 배경음악 재생
        backgroundAudioRef.current.loop = true;  // 반복 재생
        backgroundAudioRef.current.volume = 0.5;  // 볼륨 설정 (0.0 ~ 1.0)
        backgroundAudioRef.current.play();

        // 컴포넌트 언마운트 시 배경음악 정지
        return () => {
            backgroundAudioRef.current.pause();
            backgroundAudioRef.current.currentTime = 0; // 음악의 재생 시간을 0으로 리셋
        };
    }, []);

    const mainNavigate = () => {
        navigate('/main');
        clickAudioRef.current.play();
    };

    return (
        <div className={styles.container} style={{backgroundImage: `url(${BackgroundImage})`}}>
            <img src={CornerLeaf} alt="corner" className={styles.cornerLeaf}/>
            <img src={Branch} alt="brandh" className={styles.cornerBranch}/>
            <div className={styles.paperPlaneContainer}>
                <Lottie options={defaultOptions} height={400} width={400}/>
            </div>
            <div className={styles.topContainer}>
                <div className={styles.logo_container}>
                    {['배', '우', '멍', '치', '멍'].map((char, index) => (
                        <div key={index} className={styles.logo} style={{backgroundImage: `url(${Shortbtn})`}}>
                            <p className={styles.logo_text}>{char}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.subTitleContainer}>
                    <p className={styles.subTitle}>타자 치면서 배우는 제주어</p>
                </div>
            </div>
            <button
                className={`${styles.btn} ${styles.effect5}`}
                onClick={mainNavigate}
                data-hover="혼저옵서예"
            >
                <div>게임 시작하기</div>
            </button>
        </div>
    );
};

export default LandingPage;
