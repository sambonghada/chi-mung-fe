import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://www.jeju.go.kr',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api/culture/dialect', // rewrite path
            },
        })
    );
};

export default setupProxy;
