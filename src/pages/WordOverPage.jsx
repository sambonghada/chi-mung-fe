// WordOverPage.jsx
import React, { useState } from "react";
import styles from "../styles/WordOverPage.module.css";
import background from "../assets/background.png";
import RankingItem from "../components/RankingItem.jsx";
import Shortbtn from "../assets/Shortbtn.png";
import LongBtn from "../assets/Longbtn.png";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGame } from "../components/GameContext.jsx";

const WordOverPage = () => {
  const navigate = useNavigate();
  const { score } = useGame(); // Context에서 점수 가져오기
  const [username, setUsername] = useState(""); // 닉네임 상태 관리
  const replayNavigate = () => {
    navigate("/word");
  };

  const homeNavigate = () => {
    navigate("/main");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const submitScore = () => {
    const data = {
      username: username,
      score: score,
      category: "word",
    };

    console.log(data);
    fetch("http://localhost:8080/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // 요청이 성공하면 추가적인 작업을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.topContainer}>
        <span>내 점수: {score}</span> {/* 점수 표시 */}
        <div className={styles.nickInput}>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={username}
            onChange={handleUsernameChange}
          />
          <button onClick={submitScore}>랭킹 등록</button>{" "}
          {/* 점수 등록 버튼 */}
        </div>
      </div>
      <div className={styles.rankingContainer}>
        {Array(10)
          .fill()
          .map((_, index) => (
            <RankingItem key={index} backgroundColor="white" />
          ))}
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.shortBtn}
          style={{ backgroundImage: `url(${Shortbtn})` }}
          onClick={replayNavigate}
        >
          <MdOutlineReplay className={styles.icon} />
        </button>
        <button
          className={styles.longBtn}
          style={{ backgroundImage: `url(${LongBtn})` }}
          onClick={homeNavigate}
        >
          <span>홈으로 가기</span>
        </button>
      </div>
    </div>
  );
};

export default WordOverPage;
