import React, { useState } from 'react';
import styles from '../styles/VoiceTranslatePage.module.css';
import background from '../assets/voiceBg.png';
import girl from '../assets/girl.png';
import dol from '../assets/dol.png';
import { PiOrangeFill } from "react-icons/pi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { ReactMic } from 'react-mic';

const VoiceTranslatePage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');

    const startRecording = () => {
        setIsRecording(true);
        recognition.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        recognition.stop();
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';  // Set language to Korean

    recognition.onresult = (event) => {
        let finalTranscripts = '';
        let interimTranscripts = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscripts += transcript;
            } else {
                interimTranscripts += transcript;
            }
        }

        setTranscript(finalTranscripts + interimTranscripts);
    };

    return (
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
                        <div className={styles.time}>치멍 배우멍 <PiOrangeFill className={styles.orange} /></div>
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
                                <p>{transcript}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.speechContainer} style={{ marginLeft: '250px' }}>
                        <div className={styles.speechBubbleRight}>
                            <div className={styles.bubbleContentRight}>
                                <p></p>
                            </div>
                        </div>
                        <div className={styles.avatarContainer}>
                            <div className={styles.avatar}>
                                <img src={dol} alt="dol avatar" />
                            </div>
                            <p>제주어</p>
                        </div>
                    </div>
                    <div className={styles.recordBtnContainer}>
                    <div className={styles.waveContainer}>
                        <ReactMic
                            record={isRecording}
                            className={styles.soundWave}
                            strokeColor="#FF4081"
                            backgroundColor="transparent"
                            
                        />
                    </div>
                        <button
                            className={styles.recordBtn}
                            onClick={isRecording ? stopRecording : startRecording}>
                            <FaMicrophoneAlt className={styles.micICon} />
                        </button>
                    </div>
                    </div>
                   
            </div>
        </div>
    );
}

export default VoiceTranslatePage;
