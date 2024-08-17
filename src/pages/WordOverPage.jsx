import { useEffect, useState } from "react";
import styles from "../styles/WordOverPage.module.css";
import background from "../assets/background.png";
import RankingItem from "../components/RankingItem.jsx";
import Shortbtn from "../assets/Shortbtn.png";
import LongBtn from "../assets/Longbtn.png";
import { MdOutlineReplay } from "react-icons/md";
import { PiOrangeDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useGame } from "../components/GameContext.jsx";
import axios from "axios";
import { notification } from 'antd';

const baseURL = import.meta.env.VITE_BASE_URL;

const WordOverPage = () => {
  const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { score } = useGame(); // Context에서 점수 가져오기
  const [username, setUsername] = useState(""); // 닉네임 상태 관리
  const [rankings, setRankings] = useState([]);
  const [myRank, setMyRank] = useState(null);  // 내 등수 상태 관리

  const replayNavigate = () => {
    navigate("/word");
  };

  const homeNavigate = () => {
    navigate("/main");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchRankings = () => {
    axios
        .get(`${baseURL}/api/scores/top50/word`) // 50위까지 가져오기
        .then(response => {
          setRankings(response.data);
          // 내 점수에 따른 내 등수 계산
          const rank = response.data.findIndex(item => item.score <= score) + 1;
          setMyRank(rank || "순위 밖");
        })
        .catch(error => {
          console.error('Error fetching rankings:', error);
        });
  };

  const submitScore = () => {
    setIsBtnDisable(true);
    openNotification();
    const data = {
      username: username,
      score: score,
      category: "word",
    };

    fetch("https://k5d881cb764f0a.user-app.krampoline.com/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
          // 랭킹 등록 후 랭킹 새로고침
          fetchRankings();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const openNotification = () => {
    api.open({
      message: '랭킹이 등록되었습니다',
      description: '랭킹을 확인해봐요!',
      icon: <PiOrangeDuotone style={{ color: '#FFBA00' }} />,
    });
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return (
      <div
          className={styles.container}
          style={{ backgroundImage: `url(${background})` }}
      >
        {contextHolder}
        <div className={styles.topContainer}>
          <div className={styles.rank}>
            <span className={styles.myScore}>내 점수: {score}</span> {/* 점수 표시 */}
            <span className={styles.myRank}>내 등수: {myRank}</span> {/* 내 등수 표시 */}
          </div>
          <div className={styles.nickInput}>
            <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={username}
                onChange={handleUsernameChange}
            />
            <button
                onClick={submitScore}
                disabled={isBtnDisable}
                style={{
                  backgroundColor: isBtnDisable ? "gray" : "#FFBA00",
                  cursor: isBtnDisable ? "not-allowed" : "pointer"
                }}
            >
              랭킹 등록
            </button>
          </div>
        </div>
        <div className={styles.rankingContainer}>
          {rankings.map((data, index) => (
              <RankingItem key={index} index={index + 1} username={data ? data.username : "하이든"} score={data ? data.score : 30} />
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
