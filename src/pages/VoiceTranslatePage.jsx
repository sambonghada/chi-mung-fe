import React, { useState, useEffect } from 'react';
import styles from '../styles/VoiceTranslatePage.module.css';
import background from '../assets/voiceBg.png';
import girl from '../assets/girl.png';
import dol from '../assets/dol.png';
import { PiOrangeFill } from "react-icons/pi";
import { FaMicrophoneAlt, FaSquare } from "react-icons/fa";
import { Tooltip } from 'antd';
import axios from "axios";
import Lottie from 'react-lottie';
import Loading from '../assets/lottie/voiceLoading.json';
const baseURL = import.meta.env.VITE_BASE_URL;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    // rendererSettings: {
    //     preserveAspectRatio: 'xMidYMid slice'
    // }
};

const VoiceTranslatePage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translation, setTranslation] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // New state for loading

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            let formattedHours = hours % 12;
            formattedHours = formattedHours ? formattedHours : 12; // If formattedHours is 0, set it to 12 (midnight or noon)
            const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
            setCurrentTime(formattedTime);
        };
    
        updateTime(); // Set the initial time
        const interval = setInterval(updateTime, 1000); // Update the time every second
    
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    const getTranslation = (text) => {
        setIsLoading(true);  // Start loading
    
        const translationStartTime = Date.now();  // Capture the start time of the translation
    
        axios
          .get(`${baseURL}/api/translate?text=${encodeURIComponent(text)}`)
          .then(response => {
            const translationEndTime = Date.now();  // Capture the time when the translation ends
            const timeElapsed = translationEndTime - translationStartTime;
    
            // Calculate the remaining time to ensure at least 2 seconds of loading
            const delay = Math.max(1500 - timeElapsed, 0);
    
            setTimeout(() => {
                setTranslation(response.data); // Assuming response contains { translation: 'translated text' }
                setIsLoading(false);  // Stop loading
            }, delay);  // Delay to ensure loading is visible for at least 2 seconds
          })
          .catch(error => {
            console.error("Error fetching translation:", error);
            setIsLoading(false);  // Stop loading even in case of error
          });
    };
    

    const startRecording = () => {
        setIsRecording(true);
        recognition.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        recognition.stop();

        // Get the translation after stopping the recording
        getTranslation(transcript);
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
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
                        <div className={styles.time}>{currentTime}</div>
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
                                {isLoading && (
                                    <div className={styles.loadingContainer}>
                                        <Lottie options={defaultOptions} height={400} width={400} />
                                    </div>
                                )}
                                {!isLoading && <p>{translation}</p>}
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
                        <Tooltip placement="top" title="눌러서 말하기">
                            <button
                                className={styles.recordBtn}
                                onClick={isRecording ? stopRecording : startRecording}>
                                {isRecording ? (
                                    <FaSquare className={styles.micICon} />  // Change icon when recording
                                ) : (
                                    <FaMicrophoneAlt className={styles.micICon} />
                                )}
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoiceTranslatePage;
