import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useGame } from "../components/GameContext";
import axios from "axios";
import heartIMG from "../assets/heart.png";
import FruitStemIMG from "../assets/FruitStem.png";
import styles from '../styles/WordPage.module.css';
import correctSound from "../assets/word-correct.mp3"; // 효과음 추가
import backgroundSound from "../assets/word.mp3";

const baseURL = import.meta.env.VITE_BASE_URL;

// 애니메이션 타입 설정
const getAnimationType = (level) => {
  switch (level) {
    case 1:
      return "moveDown";
    case 2:
      return "moveUp";
    case 3:
      return "moveSideToSide";
    case 4:
      return "moveDown";
    case 5:
      return "moveUp";
    case 6:
      return "moveSideToSide";
    case 7:
      return "moveDown";
    case 8:
      return "moveUp";
    case 9:
      return "moveSideToSide";
    default:
      return "moveDown";
  }
};

// 키보드에 대한 상태를 관리하고, 실제 키보드 입력 시 눌림 애니메이션을 처리 (왼쪽/오른쪽 Shift 포함)
const useKeyboardAnimation = () => {
  const [pressedKey, setPressedKey] = useState(null);
  const [isLeftShift, setIsLeftShift] = useState(false);
  const [isRightShift, setIsRightShift] = useState(false);
  const backgroundAudioRef = useRef(new Audio(backgroundSound));

  useEffect(() => {
    // 배경음악 재생
    backgroundAudioRef.current.loop = true;  // 반복 재생
    backgroundAudioRef.current.volume = 0.5;  // 볼륨 설정 (0.0 ~ 1.0)
    backgroundAudioRef.current.play();

    // 컴포넌트 언마운트 시 배경음악 정지
    return () => {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0; // 음악의 재생 시간을 0으로 리셋
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Shift") {
        if (e.location === 1) {
          setIsLeftShift(true);
          setPressedKey("ShiftLeft");
        } else if (e.location === 2) {
          setIsRightShift(true);
          setPressedKey("ShiftRight");
        }
      } else {
        setPressedKey(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        if (e.location === 1) {
          setIsLeftShift(false);
        } else if (e.location === 2) {
          setIsRightShift(false);
        }
      }
      setPressedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { pressedKey, isLeftShift, isRightShift };
};

const koreanKeys = {
  normal: [
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
    ["Shift", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "Shift"],  // 두 번째 열은 Shift로 표시
  ],
  shift: [
    ["ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅒ", "ㅖ"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
    ["Shift", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "Shift"],  // 두 번째 열은 Shift로 표시
  ],
};

const Keyboard = ({ pressedKey, isLeftShift, isRightShift }) => {
  const keys = isLeftShift || isRightShift ? koreanKeys.shift : koreanKeys.normal;

  return (
      <div className={styles.keyboardContainer}>
        {keys.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.keyboardRow}>
              {row.map((key, keyIndex) => (
                  <div
                      key={keyIndex}
                      className={`${styles.keyboardKey} ${
                          (key === "Shift" && isLeftShift && pressedKey === "ShiftLeft" && keyIndex === 0) ||
                          (key === "Shift" && isRightShift && pressedKey === "ShiftRight" && keyIndex === 8) ||
                          pressedKey === key ? styles.pressed : ""
                      } ${key === "Shift" ? styles.shiftKey : ""}`}
                  >
                    {key}
                  </div>
              ))}
            </div>
        ))}
        <div className={styles.keyboardRow}>
          <div className={`${styles.keyboardKey} ${styles.spaceKey} ${pressedKey === " " ? styles.pressed : ''}`}>
            Space
          </div>
        </div>
      </div>
  );
};

Keyboard.propTypes = {
  pressedKey: PropTypes.string,
  isLeftShift: PropTypes.bool,
  isRightShift: PropTypes.bool,
};

function WordPage() {
  const [words, setWords] = useState([]);
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState("");
  const [localScore, setLocalScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [toasts, setToasts] = useState([]);  // 정답 및 오답 스택 관리
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);
  const inputRef = useRef(null);
  const nextId = useRef(9);
  const toastId = useRef(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { setScore } = useGame();
  const { pressedKey, isLeftShift, isRightShift } = useKeyboardAnimation();

  // 오디오를 담을 ref 생성
  const correctAudioRef = useRef(new Audio(correctSound));

  // API에서 단어 가져오기 및 호출된 단어 출력
  useEffect(() => {
    axios
        .get(`${baseURL}/api/word/random/100`)
        .then((response) => {
          // 데이터를 콘솔에 출력하여 확인
          console.log("Fetched words:", response.data);

          // 단어를 10개씩 나눠서 저장
          const fetchedWords = response.data.flat().map((word, index) => ({
            ...word,
            xPos: Math.random() * 80 + 10,
            id: index + 1,
            animation: getAnimationType(level),
          }));

          setWords(fetchedWords.slice(0, 10)); // 처음 10개만 사용
        })
        .catch((error) => console.error("Error fetching words from API:", error));
  }, [level]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const wordIndex = fallingWords.findIndex((w) => w.word.toLowerCase() === input.toLowerCase());
      if (wordIndex !== -1) {
        const removedWord = fallingWords[wordIndex];

        // 단어를 찾았으면 checkFallingWords에서 중복 처리되지 않도록 제거
        setFallingWords(fallingWords.filter((_, i) => i !== wordIndex));

        const newToast = {
          id: toastId.current++,
          message: `${removedWord.word} - ${removedWord.meaning}`,  // 정답은 단어와 뜻을 함께 표시
          correct: true,
        };

        setToasts((prevToasts) => [newToast, ...prevToasts]);

        setLocalScore(localScore + 1);

        // 단어를 맞출 때 효과음 재생
        correctAudioRef.current.play();
      }
      setInput("");
    }
  };

  useEffect(() => {
    if (health <= 0 || level > 10) {
      setScore(localScore);
      navigate("/word/over");
      setGameOver(true);
      clearInterval(timerRef.current);
    }
  }, [health, level]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 단어가 10개 넘으면 다음 레벨로 넘어가는 로직
  useEffect(() => {
    const addWord = () => {
      if (!gameOver && words.length > 0) {
        const newWords = words.splice(0, 1).map((word) => ({
          ...word,
          id: nextId.current++,
        }));
        setFallingWords((prev) => [...prev, ...newWords]);
        setWords(words);
      } else if (!gameOver && words.length === 0) {
        // 10개의 단어가 모두 떨어졌을 경우 다음 레벨로 넘어감
        if (level * 10 < 100) {
          setWords(words.slice(level * 10, level * 10 + 10)); // 다음 10개 가져오기
        }
        setLevel((prevLevel) => prevLevel + 1);
      }
    };

    const intervalId = setInterval(addWord, 1800 - Math.min(level, 5) * 100);
    return () => clearInterval(intervalId);
  }, [words, gameOver, level]);

  useEffect(() => {
    const checkFallingWords = () => {
      setFallingWords((prev) =>
          prev.filter((word) => {
            const wordElement = document.getElementById(word.word);
            if (wordElement) {
              const rect = wordElement.getBoundingClientRect();
              if (rect.top > window.innerHeight) {
                // 이미 제거된 단어인지 확인
                if (!word.removed) {
                  // 단어가 화면 밖으로 나가면 오답 처리하고 fallingWords에서 제거
                  const newToast = {
                    id: toastId.current++,
                    message: `${word.word} - ${word.meaning}`,  // 틀린 단어도 단어와 뜻을 함께 표시
                    correct: false,
                  };

                  setToasts((prevToasts) => [newToast, ...prevToasts]);

                  setHealth((prevHealth) => prevHealth - 10);

                  // word 객체에 removed 속성 추가
                  word.removed = true;
                }
                return false; // 단어를 필터링해서 fallingWords에서 제거
              }
            }
            return true; // 화면 안에 있는 단어는 유지
          })
      );
    };

    const intervalId = setInterval(checkFallingWords, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
      <div className={styles.gameContainer}>
        <div className={styles.topContainer}>
          <div className={styles.heartIcon} style={{ backgroundImage: `url(${heartIMG})` }} />
          <div className={styles.healthBarContainer}>
            <div className={styles.healthBarDiv} style={{ width: `${health}%`, backgroundColor: health > 30 ? '#76c7c0' : '#f46652' }} />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.level}>Level: {level}</div>
            <div className={styles.timer}>Timer: {(time / 1000).toFixed(1)}s</div>
            <div className={styles.score}>Score: {localScore}</div>
          </div>
        </div>

        {fallingWords.map((word) => (
            <div key={word.id} id={word.word}
                 className={`${styles.wordContainer} ${styles[word.animation]}`}
                 style={{ left: `${word.xPos}%`, top: '10%' }}
            >
              <div className={styles.wordBubble}>
                <img src={FruitStemIMG} alt="Fruit Stem" className={styles.fruitStem} />
                {word.word}
              </div>
            </div>
        ))}


        <div className={styles.inputKeyboardContainer}>
          <div className={styles.inputContainer}>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={gameOver}
                className={styles.input}
            />
          </div>
          <Keyboard pressedKey={pressedKey} isLeftShift={isLeftShift} isRightShift={isRightShift} />
        </div>

        <div className={styles.toastContainer}>
          {toasts.map((toast, index) => (
              <div
                  key={toast.id}
                  className={`${styles.toast} ${toast.correct ? styles.correct : styles.wrong} ${styles.swipeIn}`}
                  style={{ top: `${index * 50}px` }}
              >
                {toast.message}
              </div>
          ))}
        </div>
      </div>
  );
}

export default WordPage;
