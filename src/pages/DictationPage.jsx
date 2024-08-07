// DictationPage.js
import React, {useEffect, useMemo, useState} from 'react';
import styles from '../styles/DictationPage.module.css';
import background from '../assets/dictationBg.png';
import note from '../assets/dictationNote.png';
import MidBtn from '../assets/midBtn.png';
import { FaQuestionCircle } from "react-icons/fa";
// import { Tooltip } from 'antd';
import mockData from '../mockData.js';
import DictationItem from '../components/DictationItem.jsx';
import axios from 'axios';

// mockData를 questions 형식으로 변환
const tooltipText = <p>시간제한이 없으니 잘 듣고 띄어쓰기에 유의하여 정답을 입력해 제출해 보세요.
    듣기 버튼을 클릭하면 언제든지 다시 들을 수 있습니다.</p>;

const questions = mockData.map((item, index) => ({
    soundurl: item.soundurl,
    meaning: item.meaning,
    word: item.word
}));

const DictationPage = () => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [resetFlag, setResetFlag] = useState(0);
    const [questionList, setQuestionList] = useState([]);

    useEffect(()=>{
        axios.get(`https://k5d881cb764f0a.user-app.krampoline.com/api/word/random/5`)
            .then(response => {
                if (!response.data) {
                    setQuestionList(questions)
                    return;
                }
                const problems = response.data[0];
                setQuestionList(problems);
            })
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    },[])

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
                    {/*<Tooltip placement="bottomRight" title={tooltipText} arrow={mergedArrow}>*/}
                    {/*    <FaQuestionCircle />*/}
                    {/*</Tooltip>*/}
                </div>
                <div className={styles.itemContainer}>
                    {questionList.map((question, index) => (
                        <DictationItem
                            key={index}
                            audioSrc={question? question.soundurl : questions[0].soundurl}
                            description={question? question.meaning : questions[0].meaning}
                            correctAnswer={question?  question.word : questions[0].word}
                            index={index}
                            showAnswers={showAnswers}
                            soundNumber = {question? question.soundNumber : 0}
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
