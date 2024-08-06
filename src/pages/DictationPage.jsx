import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/DictationPage.module.css';
import '../styles/DictationItem.module.css';
import background from '../assets/dictationBg.png';
import { Howl } from 'howler';

const questions = [
    { audioSrc: '/src/assets/sound/흥창망창.mp3', description: '문제 1 설명', correctAnswer: '안녕하수깡 - 안녕하세요' },
    { audioSrc: '/src/assets/sound/흥창망창.mp3', description: '문제 2 설명', correctAnswer: '안녕하수깡 - 안녕하세요' },
    { audioSrc: '/src/assets/sound/흥창망창.mp3', description: '문제 3 설명', correctAnswer: '안녕하수깡 - 안녕하세요' },
    { audioSrc: '/src/assets/sound/흥창망창.mp3', description: '문제 4 설명', correctAnswer: '안녕하수깡 - 안녕하세요' },
    { audioSrc: '/src/assets/sound/흥창망창.mp3', description: '문제 5 설명', correctAnswer: '안녕하수깡 - 안녕하세요' },
];

const StyledDictationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StyledQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  background: ${props => (props.$play ? '#007bff' : '#28a745')};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const DictationItem = ({ audioSrc, description, correctAnswer, index, showAnswers }) => {
    const [answer, setAnswer] = useState('');

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

    return (
        <StyledDictationItem>
            <StyledQuestion>
                <span>{index + 1}번 문제: {description}</span>
                <StyledButton $play onClick={playAudio}>재생</StyledButton>
            </StyledQuestion>
            <StyledInput 
                type="text" 
                value={answer} 
                onChange={handleInputChange} 
                placeholder="답을 입력하세요"
            />
            {showAnswers && <div className="result">정답: {correctAnswer}</div>}
        </StyledDictationItem>
    );
};

const DictationPage = () => {
    const [showAnswers, setShowAnswers] = useState(false);

    const handleShowAnswers = () => {
        setShowAnswers(true);
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <div className="note">
                <div className="itemContainer">
                    {questions.map((question, index) => (
                        <DictationItem 
                            key={index} 
                            audioSrc={question.audioSrc} 
                            description={question.description}
                            correctAnswer={question.correctAnswer}
                            index={index}
                            showAnswers={showAnswers}
                        />
                    ))}
                </div>
                <StyledButton onClick={handleShowAnswers}>모든 정답 보기</StyledButton>
            </div>
        </div>
    );
};

export default DictationPage;
