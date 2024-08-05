import React from 'react';

// You can replace 'PageComponent' with the name of your component
const LandingPage = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Welcome to My Page</h1>
            </header>
            <main style={styles.main}>
                <p style={styles.text}>
                    This is a default page template. You can customize it as needed.
                </p>
            </main>
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 My Company</p>
            </footer>
        </div>
    );
};

// Styles (optional, replace with your preferred styling method)
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
    },
    header: {
        marginBottom: '20px',
    },
    title: {
        fontSize: '2.5em',
        margin: 0,
    },
    main: {
        margin: '20px 0',
    },
    text: {
        fontSize: '1.2em',
    },
    footer: {
        marginTop: '20px',
        borderTop: '1px solid #ddd',
        paddingTop: '10px',
    },
    footerText: {
        fontSize: '0.9em',
        color: '#666',
    },
};

export default LandingPage;
