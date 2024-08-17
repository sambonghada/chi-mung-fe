import React from 'react';
import styles from '../styles/VoiceTranslatePage.module.css';
import background from '../assets/voiceBg.png';
import girl from '../assets/girl.png'
import dol from '../assets/dol.png'
import { PiOrangeFill } from "react-icons/pi";
import { FaMicrophoneAlt } from "react-icons/fa";

const VoiceTranslatePage = () => {
    return(
        <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
        <h1 className={styles.title}>제주어 번역</h1>
        <div className={styles.phoneContainer}>
            <div className={styles.phoneInnerContainer}>
                <div className={styles.navContainer}>
                    <div className={styles.time}>03:00</div>
                    <div className={styles.navCenter}>
                        <div className={styles.speaker}></div>
                        <div className={styles.camera}></div>
                    </div>
                    <div className={styles.time}>치멍 배우멍 <PiOrangeFill className={styles.orange}/></div>
                </div>
                <div className={styles.speechContainer}>
                    <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        <img src={girl} alt="girl avatar" />
                    </div>
                    <p>표준어</p>
                    </div>
                 <div className={styles.speechBubbleLeft}>
                    <div className={styles.bubbleContent}>
                        <p>여기에 내용</p>
                    </div>
                 </div>
                </div>
                <div className={styles.speechContainer} style={{marginLeft: '250px'}}>
                <div className={styles.speechBubbleRight}>
                <div className={styles.bubbleContentRight}>
                        <p></p>
                    </div>
                </div>
                <div className={styles.avatarContainer}>
                <div className={styles.avatar} >
                        <img src={dol} alt="dol avatar" />
                       
                    </div>
                    <p>제주어</p>
                    </div>
                </div>
                <div className={styles.recordBtnContainer}>
                    <button className={styles.recordBtn}>
                    <FaMicrophoneAlt className={styles.micICon}/>
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default VoiceTranslatePage;