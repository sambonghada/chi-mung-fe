import { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import backgroundIMG from "../assets/background.png";
import heartIMG from "../assets/heart.png";
import fruitStemIMG from "../assets/fruitStem.png";
import {useNavigate} from "react-router-dom";


const baseWords = [
  { word: "세히", meaning: "꼼꼼히" },
  { word: "졸바로", meaning: "올바르게" },
  { word: "히지부지", meaning: "흐지부지" },
  { word: "히어뜩이", meaning: "정신이 어지럽게" },
  { word: "밀꺼니", meaning: "아무런 까닭 없이" },
  { word: "히뜩", meaning: "쓰러지는 꼴" },
  { word: "와싹", meaning: "햇볕이 강하게 쬐는 꼴" },
  { word: "오고생이", meaning: "고스란히" },
  { word: "흥창망창", meaning: "흥청망청" },
  { word: "페삭페삭", meaning: "바삭바삭" },
  { word: "하영", meaning: "많이" },
  { word: "새 각시", meaning: "신부" },
  { word: "무신", meaning: "무슨" },
  { word: "곤 죽", meaning: "쌀 죽" },
  { word: "천성", meaning: "언제나" },
  { word: "질이", meaning: "가늘게" },
  { word: "족족", meaning: "조금씩" },
  { word: "이시커니", meaning: "한참동안" },
  { word: "베량", meaning: "별로, 그다지" },
];

const generateInitialWords = (level) =>
    baseWords.map((word, index) => ({
      ...word,
      xPos: Math.random() * 80 + 10,
      id: index + 1,
      animation: getAnimationType(level),
    }));

const moveDown = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`;

const moveSideToSide = keyframes`
  0% { transform: translateX(-50%) translateX(0); }
  50% { transform: translateX(-50%) translateX(20px); }
  100% { transform: translateX(-50%) translateX(0); }
`;

const vibrate = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  25% { transform: translateX(-50%) translateY(-5px); }
  75% { transform: translateX(-50%) translateY(5px); }
`;

const moveUp = keyframes`
  0% { top: 100%; }
  100% { top: -10%; }
`;

const getAnimationType = (level) => {
  switch (level) {
    case 1:
      return "moveDown";
    case 2:
      return "moveUp";
    case 3:
      return "moveSideToSide";
    case 4:
      return "moveSideToSide";
    case 5:
      return "vibrate";
    case 6:
      return "moveUp";
    default:
      return "moveDown";
  }
};

const getAnimation = (animationType, level) => {
  const baseSpeed = 6; // 기본 속도 조정
  const speed = Math.max(baseSpeed - level, 2); // 속도를 레벨에 따라 조정

  switch (animationType) {
    case "moveUp":
      return css`
        ${moveUp} ${speed}s linear forwards
      `;
    case "moveDown":
      return css`
        ${moveDown} ${speed}s linear forwards
      `;
    case "moveSideToSide":
      return css`
        ${moveDown} ${speed}s linear forwards, ${moveSideToSide} 3s infinite
      `;
    case "vibrate":
      return css`
        ${moveDown} ${speed}s linear forwards, ${vibrate} 2s infinite
      `;
    default:
      return css`
        ${moveDown} ${speed}s linear forwards
      `;
  }
};

const GameContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${backgroundIMG}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const WordContainer = styled.div`
  position: absolute;
  top: ${props => (props.$animation === "moveUp" ? "100%" : "-10%")};
  left: ${props => props.xPos}%;
  transform: translateX(-50%);
  animation: ${props => getAnimation(props.$animation, props.$level)};
`;

const WordBubble = styled.div`
  position: relative; /* 이미지 위치를 조정하기 위해 relative로 설정 */
  background: rgb(255, 165, 0);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.5rem;
  color: black;
`;

const FruitStem = styled.img.attrs({
  src: fruitStemIMG,
  alt: 'Fruit Stem',
})`
  position: absolute;
  top: -15px; /* 단어 위에 이미지를 배치 */
  left: 55%;
  transform: translateX(-60%);
  width: 30px; /* 이미지 크기 조정 */
  height: auto;
`;

const TopContainer = styled.div`

  position: absolute;
  display: flex;
  top: 20px;
  padding-left: 100px;
  width: 100%;
  z-index: 1000; /* 가장 상단에 배치 */
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px; /* top에서 약간의 여백 추가 */
`;

const Level = styled.div`
  font-size: 1.5rem;
  color: black;
`;

const Timer = styled.div`
  font-size: 1.5rem;
  color: black;
`;

const Score = styled.div`
  font-size: 1.5rem;
  color: black;
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 10%;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 1.5rem;
  border: 2px solid black;
  border-radius: 10px;
`;

const Toast = styled.div`
  position: absolute;
  bottom: 20%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.5rem;
  animation: fadeInOut 3s;
  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;

const HealthBarContainer = styled.div`
  width: 80%;
  margin: 10px auto; /* 중앙 정렬 */
  height: 30px;
  background: #f2f2f2;
  border: 2px solid #000;
  border-radius: 10px;
`;

const HealthBarDiv = styled.div`
  height: 100%;
  transition: width 0.5s;
  border-radius: 8px;
  background: ${props => (props.health > 30 ? "#76c7c0" : "#f46652")};
`;

const HeartIcon = styled.div`
  position: relative;
  height: 50px;
  width: 100px;
  background-image: url(${heartIMG});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-right: 20px;
`;
const GameOverScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 50px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-contents: space-around;
  gap: 10px;
`;

function HealthBar({ health }) {
  return (
      <HealthBarContainer>
        <HealthBarDiv style={{ width: `${health}%` }} health={health} />
      </HealthBarContainer>
  );
}

function WordPage() {
  const [words, setWords] = useState(generateInitialWords(1));
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [toast, setToast] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);
  const inputRef = useRef(null);
  const nextId = useRef(9);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const navigateOver = () => {
    navigate('/word/over');
  }

  const handleInputChange = e => setInput(e.target.value);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const wordIndex = fallingWords.findIndex(w => w.word === input.toLowerCase());
      if (wordIndex !== -1) {
        const newFallingWords = [...fallingWords];
        const removedWord = newFallingWords.splice(wordIndex, 1)[0];
        setFallingWords(newFallingWords);
        setScore(score + 1);
        setToast(`${removedWord.word} - ${removedWord.meaning}`);
        setTimeout(() => setToast(""), 1000);
      }
      setInput("");
    }
  };

  useEffect(() => {
    if (health <= 0 || level > 10) {
      navigateOver();
      setGameOver(true);
      clearInterval(timerRef.current);
      // navigate("/over");
    }
  }, [health, level]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const addWord = () => {
      if (!gameOver && words.length > 0) {
        const newWords = words.splice(0, level === 7 ? 3 : 1).map(word => ({ ...word, id: nextId.current++ }));
        setFallingWords(prev => [...prev, ...newWords]);
        setWords(words);
      } else if (!gameOver && words.length === 0) {
        setLevel(prevLevel => {
          const newLevel = prevLevel + 1;
          if (newLevel <= 10) {
            setWords(generateInitialWords(newLevel));
          }
          return newLevel;
        });
      }
    };

    const intervalId = setInterval(addWord, 1800 - (Math.min(level, 5) * 100)); // 새 단어가 추가되는 간격을 약간 늘림
    return () => clearInterval(intervalId);
  }, [words, gameOver, level]);

  useEffect(() => {
    const checkFallingWords = () => {
      setFallingWords(prev => prev.filter(word => {
        const wordElement = document.getElementById(word.word);
        if (wordElement) {
          const rect = wordElement.getBoundingClientRect();
          if (rect.top < 0 && word.animation === "moveUp") {
            setHealth(prevHealth => prevHealth - 5); // 상단에 닿을 때 점수가 깎임
            return false;
          } else if (rect.top > window.innerHeight) {
            setHealth(prevHealth => prevHealth - 5); // 하단에 닿을 때 점수가 깎임
            return false;
          }
        }
        return true;
      }));
    };

    const intervalId = setInterval(checkFallingWords, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleRestart = () => {
    setWords(generateInitialWords(1));
    setFallingWords([]);
    setScore(0);
    setHealth(100);
    setGameOver(false);
    setLevel(1);
    setInput(""); // 텍스트 리셋
    setTime(0);
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
  };

  return (
      <GameContainer>
        <TopContainer>
          <HeartIcon />
          <HealthBarContainer>
            <HealthBarDiv health={health} style={{ width: `${health}%` }} />
          </HealthBarContainer>
          <InfoContainer>
            <Level>Level: {level}</Level>
            <Timer>Timer: {(time / 1000).toFixed(1)}s</Timer>
            <Score>Score: {score}</Score>
          </InfoContainer>
        </TopContainer>
        {fallingWords.map((word) => (
            <WordContainer key={word.id} xPos={word.xPos} $animation={word.animation} $level={level}>
              <WordBubble id={word.word}>
                <FruitStem src="/src/assets/FruitStem.png" alt="Fruit Stem" />
                {word.word}
              </WordBubble>
            </WordContainer>
        ))}
        <InputContainer>
          <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={gameOver}
          />
        </InputContainer>
        {toast && <Toast>{toast}</Toast>}
        {gameOver && (
            <GameOverScreen>
              <h1>Game Over</h1>
              <p>점수: {score}</p>
              <p>레벨: {level}</p>
              <p>시간: {(time / 1000).toFixed(1)} 초</p>
              <button onClick={handleRestart}>다시 시작</button>
            </GameOverScreen>
        )}
      </GameContainer>
  );
}

export default WordPage;
