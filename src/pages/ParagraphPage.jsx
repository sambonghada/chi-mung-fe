import { useState, useEffect, useRef } from 'react';
import styles from '../styles/ParagrpahPage.module.css';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const items = [
    {
        title: '고성목과 산방덕',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290508.jpg',
    },
    {
        title: '오서자',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290512.jpg',
    },
    {
        title: '고종달의 단혈',
        image: 'https://imagescdn.gettyimagesbank.com/500/202106/jv12307043.jpg',
    },
    {
        title: '장사 양태수',
        image: 'https://imagescdn.gettyimagesbank.com/500/202003/jv11987727.jpg',
    },
    {
        title: '여우물',
        image: 'https://imagescdn.gettyimagesbank.com/500/202106/jv12307044.jpg',
    },
    {
        title: '정방폭포와 서불과차',
        image: 'https://imagescdn.gettyimagesbank.com/500/201912/jv11956832.jpg',
    },
    {
        title: '양남택과 구렁팟 당신',
        image: 'https://imagescdn.gettyimagesbank.com/500/202005/jv12018235.jpg',
    },
    {
        title: '용궁 아들 삼형제와 매오름',
        image: 'https://imagescdn.gettyimagesbank.com/500/202005/jv12018240.jpg',
    },
    {
        title: '장사 구운문',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290511.jpg',
    },
    {
        title: '군산',
        image: 'https://imagescdn.gettyimagesbank.com/500/201909/jv11930939.jpg',
    },
    {
        title: '의귀리 김댁 종 논하니',
        image: 'https://imagescdn.gettyimagesbank.com/500/201911/jv11956188.jpg',
    },
    {
        title: '오리수',
        image: 'https://imagescdn.gettyimagesbank.com/500/202302/jv12676766.jpg',
    },
    {
        title: '신도 충견무덤',
        image: 'https://imagescdn.gettyimagesbank.com/500/202001/jv11979303.jpg',
    },
    {
        title: '오 찰방 누님',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290513.jpg',
    },
    {
        title: '이재수의 난',
        image: 'https://imagescdn.gettyimagesbank.com/500/201911/jv11956189.jpg',
    },
    {
        title: '오찬이 궤',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243880.jpg',
    },
    {
        title: '상창 하르방당신',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243886.jpg',
    },
    {
        title: '영실기암의 형성',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243877.jpg',
    },
    {
        title: '신선 놀이터',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243885.jpg',
    },
    {
        title: '선문대할망의 한라산 창조',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243883.jpg',
    },
];


const generateLoremIpsum = () => {
    const text = "옛날에 선문대할망이라는 할머니가 있었다. 이 할머니는 한라산을 베개 삼고 누우면 다리는 제주시 앞 바다에 있는 관탈섬에 걸쳐졌다 한다. 이 할머니는 빨래를 하려면 빨래를 관탈섬에 놓아 발로 밟고, 손은 한라산 꼭대기를 짚고 서서 발로 문질러 빨았다 한다. 또 다른 이야기에는 한라산을 엉덩이로 깔아 앉아 한 쪽 다리는 관탈섬에 디디고, 한쪽 다리는 서귀포시 앞바다의 지귀섬에 디디고 해서 구좌읍 소섬을 빨래돌로 삼아 빨래를 했다 한다. 어떻든 이 이야기들로 이 여신이 얼마나 거대했었는가를 능히 알 수 있다."
    return splitTextIntoChunks(text, 40);
};

const splitTextIntoChunks = (text, chunkSize) => {
    const chunks = [];
    let index = 0;

    while (index < text.length) {
        chunks.push(text.slice(index, index + chunkSize).trim());
        index += chunkSize;
    }

    return chunks;
};

const ParagraphPage = () => {
    const [sentences, setSentences] = useState([]);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [inputText, setInputText] = useState('');
    const [score, setScore] = useState(0);
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes in seconds

    const typingStarted = useRef(false);
    const lastInputTime = useRef(null);
    const timeoutRef = useRef(null);

    const [problem, setProblem] = useState([]);
    const params = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseURL}/api/tales/${params}`)
            .then(response => {
                if (!response.data) {
                    setProblem(generateLoremIpsum());
                    return;
                }
                const content = response.data.content;
                const parsedContent = splitTextIntoChunks(content, 40);
                setProblem(parsedContent);
            })
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    }, []);

    useEffect(() => {
        const loremIpsumSentences = generateLoremIpsum();
        setSentences(loremIpsumSentences);
    }, []);

    useEffect(() => {
        if (!typingStarted.current || isPaused) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setIsGameEnded(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [typingStarted.current, isPaused]);

    useEffect(() => {
        if (isGameEnded) {
            navigate('/paragraph/over', { state: { score } });
        }
    }, [isGameEnded, navigate, score]);

    const handleChange = (e) => {
        const currentInput = e.target.value;

        if (!typingStarted.current) {
            typingStarted.current = true;
            setStartTime(Date.now());
            lastInputTime.current = Date.now();
        } else if (isPaused) {
            const pausedTime = Date.now() - lastInputTime.current;
            setPauseDuration((prevPauseDuration) => prevPauseDuration + pausedTime);
            setIsPaused(false);
        }

        setInputText(currentInput);
        lastInputTime.current = Date.now();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsPaused(true);
        }, 2000);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter" && inputText !== "") {
            e.preventDefault();
            const currentSentence = problem ? problem[currentSentenceIndex] : sentences[currentSentenceIndex];

            // Calculate score based on correct words
            const correctWords = inputText.split('').filter((word, index) => word === currentSentence.split('')[index]);
            setScore((prevScore) => prevScore + correctWords.length);

            // Reset input and move to the next sentence
            setInputText('');
            setCurrentSentenceIndex((prevIndex) => {
                if (prevIndex + 1 < sentences.length) {
                    return prevIndex + 1;
                } else {
                    setIsGameEnded(true); // End game if it’s the last sentence
                    return prevIndex;
                }
            });
            typingStarted.current = false;
            setPauseDuration(0);
        }
    }

    const renderSentenceWithHighlights = () => {
        const currentSentence = problem ? problem[currentSentenceIndex] : sentences[currentSentenceIndex];
        const inputLength = inputText.length;
        if (!currentSentence) return null;

        return (
            <>
                {currentSentence.split('').map((char, index) => {
                    const isCorrect = inputText[index] === char;
                    const isExtra = index >= inputLength;

                    return (
                        <span
                            key={index}
                            className={
                                isExtra ? "" : isCorrect ? styles.correct : styles.incorrect
                            }
                        >
                            {char}
                        </span>
                    );
                })}
            </>
        );
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{items[params].title}</h1>
            <div className={styles.metadata}>
                <p className={styles.time}>남은 시간: {formatTime(timeLeft)}</p>
                <p className={styles.score}>{score} 점</p>
            </div>
            <div className={styles.textContainer}>
            <p className={styles.previousSentence}>
                    {currentSentenceIndex > 0 && problem ? problem[currentSentenceIndex - 1] : ''}
                </p>
                <p className={styles.currentSentence}>
                    {renderSentenceWithHighlights()}
                </p>
                <p className={styles.nextSentence}>
                    {currentSentenceIndex < sentences.length - 1 && problem ? problem[currentSentenceIndex + 1] : ''}
                </p>
            </div>
            <input
                className={styles.inputField}
                value={inputText}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                placeholder="주어진 설화를 따라서 타이핑해보세요."
                disabled={isGameEnded}
            />
            {isGameEnded && (
                <div className={styles.gameEndPopup}>
                    <h2>게임 종료!</h2>
                    <p>당신의 최종 점수는: {score} 점입니다</p>
                </div>
            )}
        </div>
    );
};

export default ParagraphPage;
