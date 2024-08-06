import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../styles/DictationPage.module.css';
import '../styles/DictationItem.module.css';
import background from '../assets/dictationBg.png';
import { Howl } from 'howler';

const questions = [
    { dialectId: 7569, correctAnswer: '안녕하수깡 - 안녕하세요' },
    { dialectId: 7569, correctAnswer: '안녕하수깡 - 안녕하세요' },
    { dialectId: 7569, correctAnswer: '안녕하수깡 - 안녕하세요' },
    { dialectId: 7569, correctAnswer: '안녕하수깡 - 안녕하세요' },
    { dialectId: 7569, correctAnswer: '안녕하수깡 - 안녕하세요' },
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

const DictationItem = ({ dialectId, correctAnswer, index }) => {
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState('');
    const [audioSrc, setAudioSrc] = useState('');

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const response = await axios.get(`https://www.jeju.go.kr/api/culture/dialect?dialect=${dialectId}`, {
                    responseType: 'arraybuffer',
                });
                const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioSrc(audioUrl);
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        };

        fetchAudio();
    }, [dialectId]);

    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleCheckAnswer = () => {
        setResult(`${answer} (${correctAnswer})`);
    };

    const playAudio = () => {
        const sound = new Howl({
            src: [audioSrc],
            format: ['mp3']  // format 옵션 추가
        });
        sound.play();
    };

    return (
        <StyledDictationItem>
            <StyledQuestion>
                <span>{index + 1}번 문제.</span>
                <StyledButton $play onClick={playAudio}>재생</StyledButton>
            </StyledQuestion>
            <StyledInput 
                type="text" 
                value={answer} 
                onChange={handleInputChange} 
                placeholder="답을 입력하세요"
            />
            {result && <div className="result">{result}</div>}
            <StyledButton onClick={handleCheckAnswer}>정답 확인</StyledButton>
        </StyledDictationItem>
    );
};

const DictationPage = () => {
    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <div className="note">
                <div className="itemContainer">
                    {questions.map((question, index) => (
                        <DictationItem 
                            key={index} 
                            dialectId={question.dialectId} 
                            correctAnswer={question.correctAnswer}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DictationPage;
