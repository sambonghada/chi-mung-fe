import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DictationPage.module.css';
import background from '../assets/dictationBg.png';
import note from '../assets/dictationNote.png';
import MidBtn from '../assets/midBtn.png';
import axios from 'axios';
import DictationItem from '../components/DictationItem.jsx';

const baseURL = import.meta.env.VITE_BASE_URL;

const DictationPage = () => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [resetFlag, setResetFlag] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        axios
            .get(`${baseURL}/api/word/random/5`)
            .then((response) => {
                console.log(response.data);  // 응답 데이터 확인
                const problems = response.data[0];  // 배열 안의 배열 문제 해결
                setQuestionList(problems);  // 문제 목록 설정
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
    }, []);

    const handleShowAnswers = () => {
        setShowAnswers(true);
    };

    const reload = () => {
        setShowAnswers(false);
        setResetFlag((prevFlag) => prevFlag + 1); // 리셋 트리거
    };

    const goToMain = () => {
        navigate('/main'); // '/main'으로 리다이렉트
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.note} style={{ backgroundImage: `url(${note})` }}>
                <div className={styles.itemContainer}>
                    {questionList && questionList.map((question, index) => (
                        <DictationItem
                            key={index}
                            audioSrc={question.soundNumber ? `/voices/${question.soundNumber}.mp3` : ''}
                            description={question.meaning || '설명 없음'}
                            correctAnswer={question.word || '단어 없음'}
                            index={index}
                            showAnswers={showAnswers}
                            resetFlag={resetFlag}
                        />
                    ))}
                </div>
                <div className={styles.btnConrainer}>
                    {!showAnswers ? (
                        <button
                            className={styles.longBtn}
                            style={{ backgroundImage: `url(${MidBtn})` }}
                            onClick={handleShowAnswers}
                        >
                            <span>정답 확인</span>
                        </button>
                    ) : (
                        <button
                            className={styles.longBtn}
                            style={{ backgroundImage: `url(${MidBtn})` }}
                            onClick={goToMain}
                        >
                            <span>홈으로 가기</span>
                        </button>
                    )}
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
