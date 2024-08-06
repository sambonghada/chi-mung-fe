import React from 'react';
import { FaCrown } from "react-icons/fa";
import LongBtn from "../assets/Longbtn.png"
import background from "../assets/chi-mung-bg.png";

// You can replace 'PageComponent' with the name of your component
const MainPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.buttons}>
                <div style={styles.LongBtn}><p style={styles.LongBtn_text}>단어 연습</p></div>
                <div style={styles.LongBtn}><p style={styles.LongBtn_text}>장문 연습</p></div>
                <div style={styles.LongBtn}><p style={styles.LongBtn_text}>받아 쓰기</p></div>
                <div style={styles.white_box}>
                    <FaCrown/>
                </div>
            </div>
        </div>
    );
};
const styles = {
    container: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons:{
        width: '100%',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: "30px"
    },
    LongBtn: {
        backgroundImage: `url(${LongBtn})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '699px',
        height: '192px',
        cursor: 'pointer',
    },
    LongBtn_text: {
        fontSize: '60px',
        fontWeight: '900',
        color: 'black',
        margin: '30px 0px 50px 0px'
    },
    white_box:{
        border: '3px solid black',
        borderRadius: '30px',
        marginTop: '20px',
        padding: '20px 30px',
        fontSize: '100px',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
};
export default MainPage;
