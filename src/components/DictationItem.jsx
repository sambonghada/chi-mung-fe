import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { HiSpeakerWave } from "react-icons/hi2";
import PropTypes from 'prop-types';
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
        if (audioSrc) {
            const sound = new Howl({
                src: [audioSrc],
                format: ['mp3'],
                onloaderror: (id, error) => {
                    console.error('Error loading audio:', error);
                    alert('Audio 파일을 불러오는 중 오류가 발생했습니다.');
                },
            });
            sound.play();
        } else {
            alert('오디오 파일이 없습니다.');
        }
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
                <div className={styles.questionContainer}>
                    <span className={styles.question}>{index + 1}번 뜻 : {description}</span>
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

// PropTypes를 사용하여 props의 타입을 검증
DictationItem.propTypes = {
    audioSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    showAnswers: PropTypes.bool.isRequired,
    resetFlag: PropTypes.number.isRequired,
};

export default DictationItem;
