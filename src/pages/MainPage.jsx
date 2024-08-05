import React from 'react';
import { FaCrown } from "react-icons/fa";

// You can replace 'PageComponent' with the name of your component
const MainPage = () => {
    return (
        <div style={styles.container}>
            <button style={styles.button}>단어 연습</button>
            <button style={styles.button}>장문 연습</button>
            <button style={styles.button}>받아 쓰기</button>
            <button style={styles.button}><FaCrown/></button>
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        gap: '10px', // Space between buttons
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};
export default MainPage;
