import {useEffect, useState} from 'react';
import styles from '../styles/ParagraphOverPage.module.css';
import background from "../assets/paragraph_bg.png";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import RankingItem from "../components/RankingItem.jsx";
import Shortbtn from "../assets/Shortbtn.png";
import {MdOutlineReplay} from "react-icons/md";
import LongBtn from "../assets/Longbtn.png";
import { notification } from 'antd';
import { PiOrangeDuotone } from "react-icons/pi";

const baseURL = import.meta.env.VITE_BASE_URL;

const ParagraphOverPage = () => {
    const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [api, contextHolder] = notification.useNotification();
    const location = useLocation();
    // const { score } = location.state || { score : 0};
    const score = location.state.score;
    const [username, setUsername] = useState(""); // 닉네임 상태 관리
    const navigate = useNavigate();
    const replayNavigatePragraph = () => {
        navigate("/paragraphList");
    };
    const homeNavigate = () => {
        navigate("/main");
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const openNotification = () => {
        api.open({
          message: '랭킹이 등록되었습니다',
          description: '랭킹 페이지를 확인해봐요!',
          icon: <PiOrangeDuotone style={{ color: '#FFBA00' }} />,
        });
      };
    const submitScore = () => {
        setIsBtnDisable(true);
        openNotification();
        const data = {
            username: username,
            score: score,
            category: "paragraph",
        };

        fetch(`${baseURL}/api/scores`, {
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

    const [rankings, setRankings] = useState([]);
    useEffect(() => {
        // Replace 'your-backend-url' with your actual API endpoint
        axios.get(`${baseURL}/api/scores/top10/paragraph`)
            .then(response => {
                setRankings(response.data); // Assuming the response data is an array of rankings
            })
            .catch(error => {
                console.error('Error fetching rankings:', error);
            });
    }, []);

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: `url(${background})` }}
        >
            {contextHolder}
            <div className={styles.topContainer}>
                <span>내 점수: {score}</span> {/* 점수 표시 */}
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
                    >랭킹 등록</button>{" "}
                    {/* 점수 등록 버튼 */}
                </div>
            </div>
            <div className={styles.rankingContainer}>
                {rankings
                    .map((data, index) => (
                        <RankingItem key={index} index={index+1} username={data? data.username : "하이든"} score={data? data.score : 30}/>
                    ))}
            </div>
            <div className={styles.btnContainer}>
                <button
                    className={styles.shortBtn}
                    style={{ backgroundImage: `url(${Shortbtn})` }}
                    onClick={replayNavigatePragraph}
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

export default ParagraphOverPage;
