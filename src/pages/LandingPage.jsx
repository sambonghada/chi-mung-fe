import React from 'react';
import BackgroundImage from '../assets/chi-mung-bg.png';
import Shortbtn from '../assets/Shortbtn.png';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.logo_container}>
                <div style={styles.logo}><p style={styles.logo_text}>배</p></div>
                <div style={styles.logo}><p style={styles.logo_text}>우</p></div>
                <div style={styles.logo}><p style={styles.logo_text}>멍</p></div>
                <div style={styles.logo}><p style={styles.logo_text}>치</p></div>
                <div style={styles.logo}><p style={styles.logo_text}>멍</p></div>
            </div>
            <div style={styles.btn}>혼저옵서예</div>
        </div>
    );
};

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        overflow: 'hidden',
    },
    logo_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        width: '550px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        backgroundImage: `url(${Shortbtn})`,
        width: '150px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    logo_text: {
      fontSize: '60px',
      fontWeight: '900',
      color: 'black',
      marginBottom: '80px',
    },
    btn:{
        justifySelf: 'flex-end',
        border: '#000000 solid 3px',
        padding: '10px',
        borderRadius: '50px',
        width: '300px',
        height: 'include',
        textAlign: 'center',
        fontSize: '40px',
        backgroundColor: '#fffdeb',
        color: '#000000',
    },
}

export default LandingPage;
