import React from 'react';
import BackgroundImage from '../assets/landingBg.png';
import CornerLeaf from '../assets/landingCorner.png';
import Branch from '../assets/landingBranch.png';
import Lottie from 'react-lottie';
import PaperPlane from '../assets/lottie/paperPlane.json';
import Shortbtn from '../assets/Shortbtn.png';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

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

    const mainNavigate = () => {
        navigate('/main');
    };

    return (
        <div className={styles.container} style={{backgroundImage: `url(${BackgroundImage})`}}>
            <img src={CornerLeaf} alt="corner" className={styles.cornerLeaf}/>
            <img src={Branch} alt="brandh" className={styles.cornerBranch}/>
            <div className={styles.paperPlaneContainer}>
                <Lottie options={defaultOptions} height={400} width={400}/>
            </div>
            <div className={styles.logo_container}>
                {['배', '우', '멍', '치', '멍'].map((char, index) => (
                    <div key={index} className={styles.logo} style={{backgroundImage: `url(${Shortbtn})`}}>
                        <p className={styles.logo_text}>{char}</p>
                    </div>
                ))}
            </div>
            <button
                className={`${styles.btn} ${styles.effect5}`}
                onClick={mainNavigate}
                data-hover="게임 시작하기"
            >
                <div>혼저옵서예</div>
            </button>
        </div>
    );
};

export default LandingPage;
