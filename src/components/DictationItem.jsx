// DictationItem.js
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { HiSpeakerWave } from "react-icons/hi2";
import answerImg from '../assets/answer.png';
import wrongImg from '../assets/wrong.png';
import styles from '../styles/DictationPage.module.css';

const DictationItem = ({ audioSrc, description, correctAnswer, index, showAnswers, resetFlag }) => {
    const [answer, setAnswer] = useState('');

    const answerTrimmed = answer.trim();
    const isCorrect = answerTrimmed === correctAnswer;

    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    const playAudio = () => {
        const sound = new Howl({
            src: [audioSrc],
            format: ['mp3']
        });
        sound.play();
    };

    // Reset the answer when resetFlag changes
    useEffect(() => {
        setAnswer('');
    }, [resetFlag]);

    return (
        <div className={styles.dictationItem}>
            {showAnswers && (
                <img
                    src={isCorrect ? answerImg : wrongImg}
                    alt={isCorrect ? "answer" : "wrong"}
                    className={styles.answer}
                />
            )}
            <div className={styles.itemTopContainer}>
                <div className={styles.question}>
                    <span>{index + 1}번 표준어: {description}</span>
                </div>
                <div className={styles.soundInput}>
                    <button className={styles.playButton} onClick={playAudio}><HiSpeakerWave /></button>
                    <input
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        placeholder="답을 입력하세요"
                        className={styles.input}
                        disabled={showAnswers}
                    />
                </div>
            </div>
            {showAnswers && <div className={styles.result}>정답: {correctAnswer}</div>}
        </div>
    );
};

export default DictationItem;
