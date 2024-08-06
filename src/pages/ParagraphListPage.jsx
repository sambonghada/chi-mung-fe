import {useNavigate} from "react-router-dom";
import styles from "../styles/ParagraphListPage.module.css";
import background from "../assets/mainBg.png";

const ParagraphListPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                {['고성목과 산방덕', '오서자', '고종달의 단혈','장사 양태수','여우물','정방폭포와 서불과차','양남택과 구렁팟 당신','용궁 아들 삼형제와 매오름','장사 구운문','군산','의귀리 김댁 종 논하니','오리수','신도 충견무덤','오 찰방 누님','이재수의 난','오찬이 궤','상창 하르방당신','영실기암의 형성','신선 놀이터','선문대할망의 한라산 창조'].map((text, index) => {
                    return (
                        <button
                            className={styles.button}
                            key={index}
                            onClick={() => handleNavigation( `/paragraph/${index}`)}
                        >
                            <p>{text}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default ParagraphListPage;