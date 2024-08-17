import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import styles from '../styles/ParagraphListPage.module.css';

const { Meta } = Card;
const items = [
    {
        title: '고성목과 산방덕',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290508.jpg',
    },
    {
        title: '오서자',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290512.jpg',
    },
    {
        title: '고종달의 단혈',
        image: 'https://imagescdn.gettyimagesbank.com/500/202106/jv12307043.jpg',
    },
    {
        title: '장사 양태수',
        image: 'https://imagescdn.gettyimagesbank.com/500/202003/jv11987727.jpg',
    },
    {
        title: '여우물',
        image: 'https://imagescdn.gettyimagesbank.com/500/202106/jv12307044.jpg',
    },
    {
        title: '정방폭포와 서불과차',
        image: 'https://imagescdn.gettyimagesbank.com/500/201912/jv11956832.jpg',
    },
    {
        title: '양남택과 구렁팟 당신',
        image: 'https://imagescdn.gettyimagesbank.com/500/202005/jv12018235.jpg',
    },
    {
        title: '용궁 아들 삼형제와 매오름',
        image: 'https://imagescdn.gettyimagesbank.com/500/202005/jv12018240.jpg',
    },
    {
        title: '장사 구운문',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290511.jpg',
    },
    {
        title: '군산',
        image: 'https://imagescdn.gettyimagesbank.com/500/201909/jv11930939.jpg',
    },
    {
        title: '의귀리 김댁 종 논하니',
        image: 'https://imagescdn.gettyimagesbank.com/500/201911/jv11956188.jpg',
    },
    {
        title: '오리수',
         image: 'https://imagescdn.gettyimagesbank.com/500/202302/jv12676766.jpg',
    },
    {
        title: '신도 충견무덤',
        image: 'https://imagescdn.gettyimagesbank.com/500/202001/jv11979303.jpg',
    },
    {
        title: '오 찰방 누님',
        image: 'https://imagescdn.gettyimagesbank.com/500/202105/jv12290513.jpg',
    },
    {
        title: '이재수의 난',
        image: 'https://imagescdn.gettyimagesbank.com/500/201911/jv11956189.jpg',
    },
    {
        title: '오찬이 궤',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243880.jpg',
    },
    {
        title: '상창 하르방당신',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243886.jpg',
    },
    {
        title: '영실기암의 형성',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243877.jpg',
    },
    {
        title: '신선 놀이터',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243885.jpg',
    },
    {
        title: '선문대할망의 한라산 창조',
        image: 'https://imagescdn.gettyimagesbank.com/500/202103/jv12243883.jpg',
    },
];


const ParagraphListPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1>제주 설화 리스트</h1>
                <p>20가지의 제주 설화를 타자 연습으로 익혀봐요</p>
            </div>
            <div className={styles.cards}>
                {items.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        style={{ width: 240, margin: '10px' }}
                        cover={
                            <div style={{ overflow: 'hidden', height: 240 }}>
                                <img
                                    alt={item.title}
                                    src={item.image}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        transform: 'translateY(-27px)'
                                    }}
                                />
                            </div>
                        }
                        onClick={() => handleNavigation(`/paragraph/${index}`)}
                    >
                        <Meta title={item.title} />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ParagraphListPage;
