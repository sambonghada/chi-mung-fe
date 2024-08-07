import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/ParagrpahPage.module.css';
import axios from "axios";
import {useParams} from "react-router-dom";

const generateLoremIpsum = () => {
    const text = "옛날에 선문대할망이라는 할머니가 있었다. 이 할머니는 한라산을 베개 삼고 누우면 다리는 제주시 앞 바다에 있는 관탈섬에 걸쳐졌다 한다. 이 할머니는 빨래를 하려면 빨래를 관탈섬에 놓아 발로 밟고, 손은 한라산 꼭대기를 짚고 서서 발로 문질러 빨았다 한다. 또 다른 이야기에는 한라산을 엉덩이로 깔아 앉아 한 쪽 다리는 관탈섬에 디디고, 한쪽 다리는 서귀포시 앞바다의 지귀섬에 디디고 해서 구좌읍 소섬을 빨래돌로 삼아 빨래를 했다 한다. 어떻든 이 이야기들로 이 여신이 얼마나 거대했었는가를 능히 알 수 있다."
    return splitTextIntoChunks(text,40);
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
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pauseDuration, setPauseDuration] = useState(0);

    const typingStarted = useRef(false);
    const lastInputTime = useRef(null);
    const timeoutRef = useRef(null);

    const [problem,setProblem] = useState([])
    const params = useParams().id;
    useEffect(()=>{

        axios.get(`https://k5d881cb764f0a.user-app.krampoline.com/api/tales/${params}`)
            .then(response => {
                if (!response.data) {
                    setProblem(generateLoremIpsum());
                    return
                }
                const content = response.data.content;
                const parsedContent = splitTextIntoChunks(content,40)
                setProblem(parsedContent); // Assuming the response data is an array of rankings
            })
            .catch(error => {
                console.error('Error fetching rankings:', error);
            });
    },[])


    useEffect(() => {
        const loremIpsumSentences = generateLoremIpsum();
        setSentences(loremIpsumSentences);
    }, []);

    useEffect(() => {
        if (!typingStarted.current || isPaused) return;

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const totalElapsedTime = (currentTime - startTime - pauseDuration) / 60000; // 분 단위 시간
            const wordsTyped = inputText.length / 5;
            setWpm(Math.round(wordsTyped / totalElapsedTime));
        }, 500);

        return () => clearInterval(interval);
    }, [inputText, startTime, pauseDuration, isPaused]);

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
            setInputText('');
            setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
            setWpm(0);
            typingStarted.current = false;
            setPauseDuration(0);
        }
    }

    const renderSentenceWithHighlights = () => {
        const currentSentence = problem ? problem[currentSentenceIndex] : sentences[currentSentenceIndex];
        const inputLength    = inputText.length;
        if (!currentSentence) return null;

        return (
            <>
                {currentSentence.split('').map((char, index) => {
                    const isCorrect = inputText[index] === char;
                    const isExtra = index >= inputLength;

                    return (
                        <span
                            key={index}
                            style={{
                                // color: !isCorrect && !isExtra ? 'red' : 'white',
                                // boxShadow: !isExtra && isCorrect ? 'inset 0 -10px 0 green' : 'none',
                            }}
                            className ={
                                isExtra ? "" : isCorrect? styles.correct : styles.incorrect
                            }
                        >
                            {char}
                        </span>
                    );
                })}
            </>
        );
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>설화 제목</h1>
            <div className={styles.textContainer}>
                <p className={styles.previousSentence}>
                    {currentSentenceIndex > 0 && problem ? problem[currentSentenceIndex -1] : ''}
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
                onKeyUp={handleKeyUp}  // IME 입력 종료
                placeholder="따라쳐보세요...!"
            />
            <p className={styles.wpm}>Words Per Minute (WPM): {wpm}</p>
        </div>
    );
};

export default ParagraphPage;
