// DictationPage.js
import React, { useMemo, useState } from 'react';
import styles from '../styles/DictationPage.module.css';
import background from '../assets/dictationBg.png';
import note from '../assets/dictationNote.png';
import MidBtn from '../assets/midBtn.png';
import { FaQuestionCircle } from "react-icons/fa";
import { Tooltip } from 'antd';
import mockData from '../mockData.js';
import DictationItem from '../components/DictationItem.jsx';

// mockData를 questions 형식으로 변환
const tooltipText = <p>시간제한이 없으니 잘 듣고 띄어쓰기에 유의하여 정답을 입력해 제출해 보세요.
    듣기 버튼을 클릭하면 언제든지 다시 들을 수 있습니다.</p>;

const questions = mockData.map((item, index) => ({
    audioSrc: item.soundurl,
    description: item.meaning,
    correctAnswer: item.word
}));

const DictationPage = () => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [resetFlag, setResetFlag] = useState(0);

    const handleShowAnswers = () => {
        setShowAnswers(true);

    };

    const reload = () => {
        setShowAnswers(false);
        setResetFlag(prevFlag => prevFlag + 1);  // Trigger a reset
    };

    const mergedArrow = useMemo(() => {
        return {
            pointAtCenter: true,
        };
    }, []);

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.note} style={{ backgroundImage: `url(${note})` }}>
                <div className={styles.questionIcon}>
                    <Tooltip placement="bottomRight" title={tooltipText} arrow={mergedArrow}>
                        <FaQuestionCircle />
                    </Tooltip>
                </div>
                <div className={styles.itemContainer}>
                    {questions.map((question, index) => (
                        <DictationItem
                            key={index}
                            audioSrc={question.audioSrc}
                            description={question.description}
                            correctAnswer={question.correctAnswer}
                            index={index}
                            showAnswers={showAnswers}
                            resetFlag={resetFlag} // Pass the resetFlag to each DictationItem
                        />
                    ))}
                </div>
                <div className={styles.btnConrainer}>
                    <button
                        className={styles.longBtn}
                        style={{ backgroundImage: `url(${MidBtn})` }}
                        onClick={handleShowAnswers}
                    >
                        <span>정답 확인</span>
                    </button>
                    <button
                        className={styles.longBtn}
                        style={{ backgroundImage: `url(${MidBtn})` }}
                        onClick={reload}
                    >
                        <span>다시 풀기</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DictationPage;
